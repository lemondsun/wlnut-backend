const getPostsByTags = require("../services/getPostsByTags");
const axios = require('axios');

jest.mock('axios');


describe("mock api calls", () => {
  test('mocking external endpoint in axios',async () => {
    
      const mockedResponse = {
      posts: {
        author: "Jon Abbott",
        authorId: 4,
        id: 95,
        likes: 985,
        popularity: 0.42,
        reads: 55875,
        tags: [
          "politics",
          "tech",
          "health",
          "history"
        ]
      }
      };
    const req = {
      params: {
        tags: "politics,tech"
      }}
    axios.get.mockResolvedValue(mockedResponse)

    const post = await getPostsByTags(req);

    expect(post).toHaveBeenCalled();

  })
})




