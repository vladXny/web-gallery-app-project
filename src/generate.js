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

pictures = [   
    "https://sevelina.ru/images/uploads/2014/02/456.png",
    "https://cdn1.ozone.ru/s3/multimedia-d/c1000/6028318729.jpg",   
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
}

const generateComments = (number) => {
    comments = []
    for (let i = 0; i < number; i++){

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
            url: `${pictures[randInt(0, pictures.length-1)]}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            likes: randInt(15,200),
            comments: generateComments(randInt(1,10)),
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


}
generatePosts(15);

// ************************ Drag and drop ***************** //
let dropArea = document.getElementById("drop-area")

// Prevent default drag behaviors
;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false)   
  document.body.addEventListener(eventName, preventDefaults, false)
})

// Highlight drop area when item is dragged over it
;['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false)
})

;['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false)
})

// Handle dropped files
dropArea.addEventListener('drop', handleDrop, false)

function preventDefaults (e) {
  e.preventDefault()
  e.stopPropagation()
}

function highlight(e) {
  dropArea.classList.add('highlight')
}

function unhighlight(e) {
  dropArea.classList.remove('active')
}

function handleDrop(e) {
  var dt = e.dataTransfer
  var files = dt.files

  handleFiles(files)
}

let uploadProgress = []
let progressBar = document.getElementById('progress-bar')

function initializeProgress(numFiles) {
  progressBar.value = 0
  uploadProgress = []

  for(let i = numFiles; i > 0; i--) {
    uploadProgress.push(0)
  }
}

function updateProgress(fileNumber, percent) {
  uploadProgress[fileNumber] = percent
  let total = uploadProgress.reduce((tot, curr) => tot + curr, 0) / uploadProgress.length
  progressBar.value = total
}

function handleFiles(files) {
  files = [...files]
  initializeProgress(files.length)
  files.forEach(uploadFile)
  files.forEach(previewFile)
}

function previewFile(file) {
  let reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = function() {
    let img = document.createElement('img')
    img.src = reader.result
    document.getElementById('gallery').appendChild(img)
  }
}

function uploadFile(file, i) {
  var url = 'https://api.cloudinary.com/v1_1/joezimim007/image/upload'
  var xhr = new XMLHttpRequest()
  var formData = new FormData()
  xhr.open('POST', url, true)
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')

  // Update progress (can be used to show progress indicator)
  xhr.upload.addEventListener("progress", function(e) {
    updateProgress(i, (e.loaded * 100.0 / e.total) || 100)
  })

  xhr.addEventListener('readystatechange', function(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      updateProgress(i, 100) // <- Add this
    }
    else if (xhr.readyState == 4 && xhr.status != 200) {
      // Error. Inform the user
    }
  })

  formData.append('upload_preset', 'ujpu6gyk')
  formData.append('file', file)
  xhr.send(formData)
}