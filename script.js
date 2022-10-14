let post_ids_count = 0;
let comment_ids_count = 0;
let user_ids_count = 0;
let used_post_ids = [];


users = [
    {
        name: 'Bob',
        id: 1,
        avatar: `./img/avatar-1.svg`
    }, 
    {
        name: 'Steve',
        id: 2,
        avatar: `./img/avatar-2.svg`
    }, 
    {
        name: 'John',
        id: 3,
        avatar: `./img/avatar-3.svg`
    }, 
    {
        name: 'Michael',
        id: 4,
        avatar: `./img/avatar-4.svg`
    }, 
    {
        name: 'William',
        id: 5,
        avatar: `./img/avatar-5.svg`
    }, 
    {
        name: 'Lia',
        id: 6,
        avatar: `./img/avatar-6.svg`
    }

]

function randInt(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateId = (number) => {
    while (true) {
        id = randInt (1,number);
        if (used_post_ids.includes(id)) {
            continue;
        } else {
            used_post_ids.push(id)
            return id;
        }
    }
    /* if (type === 'user') {
        user_ids_count += 1;
        return user_ids_count;
    } */
    
    
}

const generateComments = (number) => {
    comments = []
    for (let i = 0; i < number; i++){
        //id = generateId()
        comment = {
            id: 0,
            user: users[Math.floor(Math.random()*users.length)],
            message: 'aliquip ex ea commodo consequat',
        }
        comments.push(comment)
    }
    return comments
}


const generatePosts = (number) => {
    for (let i = 1; i <= number; i++){
        const id = generateId(number);
        const post = {
            id: id,
            url: `./photos/${id}.img`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            likes: randInt(15,200),
            comments: generateComments(randInt(1,10)),
        }
        
        console.log (post);

        const postEl = document.createElement('div');
        postEl.classList.add('card')
        document.querySelector('.container').append(postEl);

        const likesEl = document.createElement('div');
        likesEl.classList.add('likes');

        const commentsEl = document.createElement('div');
        commentsEl.classList.add('comments');

        document.querySelector(`.card:nth-child(${i})`).append(commentsEl, likesEl);
        likesEl.textContent = `Лайки: ${post.likes}`;
        commentsEl.textContent = `Комментарии: ${post.comments.length}`;

    }


}
generatePosts(5);

