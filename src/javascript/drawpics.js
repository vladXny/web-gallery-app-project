

getData((pictures)=>{
    console.log (pictures);
    for (let i = 0; i <= pictures.length; i++){
        const post = {
            id: pictures[i].id,
            url: pictures[i].url,
            description: pictures[i].description,
            likes: pictures[i].likes,
            comments: pictures[i].comments,
        }
        console.log (post);

        const container = document.querySelector('.main-container');
        container.innerHTML = container.innerHTML + `
            <div class="post-card" style="background-image: url(${post.url})">
                <div class="likes"><img src="./img/like-icon.png" class="lcimg" style="width: 20px; height: 20px"><b>${post.likes}</b></div>                                
                <div class="comments"><img src="./img/comment-icon.png" class="lcimg" style="width: 20px; height: 20px"><b>${post.comments.length}</b></div>
            </div>
        `;

    }
})