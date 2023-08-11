import { RepoServerListResponse, Repository } from "@/types"

export const RepoServerAPIService = {
  listAll: async function (): Promise<RepoServerListResponse> {
    if (!(await this.checkHealth())) {
      throw new Error("Health check failed. RepoServer API is not responding")
    }

    try {
      const response = await fetch('http://localhost:8080/repo/')
      if(response.ok) {
        return response.json()
      }
      return Promise.reject("Request was not OK")
    } catch(error) {
      // log to observability if implemented SDK requires manually logging
      // log to console for dev to introspect error
      console.error(error)
      throw new Error("Failed to fetch repositories from RepoServer API")
    }  
  },
  checkHealth: async function (): Promise<boolean>{
    try {
      const response = await fetch('http://localhost:8080/health')
      return response.ok ? true : false
    } catch(error) {
      console.error(error)
      throw new Error('Health check failed. RepoServer API is not responding')
    }
  },
  deleteRepo: async function (id: string) {
    if (!(await this.checkHealth())) {
      throw new Error("Health check failed. RepoServer API is not responding")
    }
    try {
      const response = await fetch(`http://localhost:8080/repo/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id)
      })

      if(response.ok) {
        return Promise.resolve(`Successful deletion of repository with id of ${id}`)
      }
      return Promise.reject(`Failed to delete repository with id of ${id}`)
    } catch(error) {
      console.error(error)
    }
  },
  createRepo: async function (repository: Repository) {
    if (!(await this.checkHealth())) {
      throw new Error("Health check failed. RepoServer API is not responding")
    }
    try {
      const response = await fetch('http://localhost:8080/repo/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(repository)
      })

      if(response.ok) {
        return Promise.resolve(`Successful creation of repository with id of ${repository.id}`)
      }
      return Promise.reject("Request was not OK. Failed to add favorite repository")
    } catch(error) {
      console.error(error)
    }
  }
}