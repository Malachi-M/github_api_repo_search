import { RepoServerAPIService } from '../RepoServerAPIService'
import { Repository } from '@/types'

describe('RepoServerAPIService', () => {
  describe('listAll', () => {
    it('should return a list of repositories', async () => {
      const response = await RepoServerAPIService.listAll()
      expect(response).toHaveProperty('repos')
      expect(Array.isArray(response.repos)).toBe(true)
    })

    it('should throw an error if the API is not responding', async () => {
      jest.spyOn(RepoServerAPIService, 'checkHealth').mockResolvedValueOnce(false)
      await expect(RepoServerAPIService.listAll()).rejects.toThrow('Health check failed. RepoServer API is not responding')
    })

    it('should throw an error if the API returns an error', async () => {
      jest.spyOn(RepoServerAPIService, 'checkHealth').mockResolvedValueOnce(true)
      jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Failed to fetch'))
      await expect(RepoServerAPIService.listAll()).rejects.toThrow("Failed to fetch repositories from RepoServer API")
    })
  })

  describe('checkHealth', () => {
    it('should return true if the API is responding', async () => {
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true
      } as Response)
      const response = await RepoServerAPIService.checkHealth()
      expect(response).toBe(true)
    })

    it('should throw an error if the API is not responding', async () => {
      jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Failed to fetch'))
      await expect(RepoServerAPIService.checkHealth()).rejects.toThrow('Health check failed. RepoServer API is not responding')
    })
  })

  describe('createRepo', () => {
    it('should create a repository', async () => {
      const mockRepository: Repository = {
        id: '123',
        fullName: 'test',
        stargazersCount: 123,
        url: 'http://test.com',
        language: "JavaScript",
        createdAt: new Date().toISOString()
      }
      jest.spyOn(RepoServerAPIService, 'checkHealth').mockResolvedValue(true)
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true
      } as Response)
      await RepoServerAPIService.createRepo(mockRepository)
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/repo/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mockRepository)
      })
    })

    it('should throw an error if the API is not responding', async () => {
      jest.spyOn(RepoServerAPIService, 'checkHealth').mockResolvedValueOnce(false)
      await expect(RepoServerAPIService.createRepo({} as Repository)).rejects.toThrow('Health check failed. RepoServer API is not responding')
    })

    it('should throw an error if the API returns an error', async () => {
      jest.spyOn(RepoServerAPIService, 'checkHealth').mockResolvedValueOnce(true)
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: false
      } as Response)
      await expect(RepoServerAPIService.createRepo({} as Repository)).rejects.toEqual('Request was not OK. Failed to add favorite repository')
    })
  })

  describe('deleteRepo', () => {
    it('should delete a repository', async () => {
      const mockId = '123'
      jest.spyOn(RepoServerAPIService, 'checkHealth').mockResolvedValueOnce(true)
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true
      } as Response)
      await RepoServerAPIService.deleteRepo(mockId)
      expect(global.fetch).toHaveBeenCalledWith(`http://localhost:8080/repo/${mockId}`,  {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mockId)
      })
    })

    it('should throw an error if the API is not responding', async () => {
      jest.spyOn(RepoServerAPIService, 'checkHealth').mockResolvedValueOnce(false)
      await expect(RepoServerAPIService.deleteRepo('123')).rejects.toThrow('Health check failed. RepoServer API is not responding')
    })

    it('should throw an error if the API returns an error', async () => {
      jest.spyOn(RepoServerAPIService, 'checkHealth').mockResolvedValueOnce(true)
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: false
      } as Response)
      await expect(RepoServerAPIService.deleteRepo('123')).rejects.toEqual('Failed to delete repository with id of 123')
    })
  })
})