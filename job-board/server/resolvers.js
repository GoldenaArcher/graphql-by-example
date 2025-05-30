export const resolvers = {
    Query: {
        job: () => {
            return {
                // id: 'test-id',
                // title: 'The Title', 
                // description: 'The description'
            }
        },
        jobs: () => {
            return [
                {
                    id: 'test-id',
                    title: 'The Title',
                    description: 'The description'
                }
            ]
        }
    }
}