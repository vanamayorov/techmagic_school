const API_URL = "https://jsonplaceholder.typicode.com/posts";

interface IPost {
    userId: number;
    id: number;
    title: string;
    body: string;
}

(async () => {
    
    async function fetchPosts<T>(): Promise<T[]> {
        try {
            const res = await fetch(API_URL);
            const posts = await res.json();
            return posts as T[];
        } catch (e) {
            throw e;
        }
    }

    async function renderNodes(selector = ".container") {
        const placeToRender = document.querySelector(selector) as HTMLDivElement;

        const posts = await fetchPosts<IPost>();
        for (const post of posts) {
            placeToRender.innerHTML += getNodeMarkup(post);
        }
    }

    function getNodeMarkup<T extends IPost>(post: T) {
        return `
                <div class="col-sm-3 mb-2">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${post.title}</h5>
                            <p class="card-text">${post.body}</p>
                        </div>
                    </div>
                </div>
        `;
    }

    await renderNodes(".main-list");
})();

