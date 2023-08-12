import { GithubRepoSearch } from "../GithubRepoSearchService";

describe("GithubRepoSearch", () => {
  it("should return an array of SearchResult objects", async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        items: [
          {
            id: 1,
            full_name: "test/repo",
            stargazers_count: 10,
            language: "JavaScript",
            html_url: "https://github.com/test/repo",
            created_at: "2021-01-01T00:00:00Z",
            description: "Test repository",
          },
        ],
      }),
    } as Response)

    const results = await GithubRepoSearch("react");

    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0]).toHaveProperty("id");
    expect(results[0]).toHaveProperty("fullName");
    expect(results[0]).toHaveProperty("stargazersCount");
    expect(results[0]).toHaveProperty("language");
    expect(results[0]).toHaveProperty("url");
    expect(results[0]).toHaveProperty("createdAt");
    expect(results[0]).toHaveProperty("description");

    (fetch as jest.MockedFunction<typeof fetch>).mockClear();
  });

  it("should return an empty array when no query is provided", async () => {
    const results = await GithubRepoSearch();
    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBe(0);
  });

  it("should reject the promise when the search request is not successful", async () => {
    const mockResponse = new Response(null, { status: 401, statusText: "Unauthorized" });
    const mockFetch = jest.fn(() => Promise.resolve(mockResponse));
    global.fetch = mockFetch;

    await expect(GithubRepoSearch("react")).rejects.toEqual(
      "Search request was not OK. 401 Unauthorized"
    );

    (global.fetch as any).mockClear();
  });


  it("should throw an error when the Github API request fails", async () => {
    const mockFetch = jest.fn(() => Promise.reject(new Error("API error")));
    global.fetch = mockFetch;

    await expect(GithubRepoSearch("react")).rejects.toThrow(
      "Failed to fetch repositories from Github API"
    );

    (global.fetch as any).mockClear();
  });
})