(() => {
    const apiUrl = '/api/posts';

    const feed = document.getElementById('feed');
    const createPost = document.getElementById('createPost');
    const postTextCreate = document.getElementById('postTextCreate');
    const postAttachCreate = document.getElementById('postAttachCreate');
    const postImageCreate = document.getElementById('postImageCreate');
    const postPublishCreate = document.getElementById('postPublishCreate');

    const postTextEdit = document.getElementById('postTextEdit');
    const postAttachEdit = document.getElementById('postAttachEdit');
    const postImageEdit = document.getElementById('postImageEdit');
    const postPublishEdit = document.getElementById('postPublishEdit');

    let actualPosts = [];

    init();

    function init() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(response => {
                actualPosts = response;
                renderPosts(actualPosts);
                initListeners();
            })
            .catch(e => console.log(e));
    }

    function getPostTemplate(post) {
      const imgTemplate = `<div class="boy" data-grid="images">
        <img class="js-post__img" 
          style="display: inline-block; 
            width: 346px; 
            height: 335px; 
            margin-bottom: 10px; 
            margin-right: 0px; 
            vertical-align: bottom;" 
          data-width="640" data-height="640" data-action="zoom" src="${post.picture}">
      </div>`;

      const imgBlock = (post.picture) ? imgTemplate : ``;

      return `<li class="rv b agz">
          <img class="bos vb yb aff" src="${post.author.avatar}">
          <div class="rw">
          
            <div class="bpb">
              <small class="acx axc">${moment(post.publicationDate).format('YYYY-MM-DD HH:mm')}</small>
              <h6>${post.author.name}</h6>
            </div>

            <p class="js-post__text">${post.text}
            </p>
            ${imgBlock}
            <a href="#postModalEdit" class="boa" data-toggle="modal" data-id="${post.id}">
                <button class="cg nz ok" data-id="${post.id}">Редактировать пост</button>
            </a>
                <button type="button" class="close js-close" aria-hidden="true" title="Удалить">×</button>
          </div>
        </li>`
    }

    function renderPosts(posts) {
        feed.innerHTML = '';
        posts.forEach(post => {
            feed.innerHTML += getPostTemplate(post);
        })
    }

    function addPost(post) {
      feed.insertAdjacentHTML(`afterBegin`, getPostTemplate(post));
    }

    function initListeners() {
        createPost.addEventListener('click', createPostListener);
        feed.addEventListener('click', editPostListener);
        feed.addEventListener('click', deletePostListener);
    }

    function editPostListener(event) {
        if (!event.target.getAttribute("data-id")) {
            return;
        }
        postAttachEdit.value = '';

        const id = event.target.getAttribute("data-id");
        const api = `${apiUrl}/${id}`;

        fetch(api)
            .then(res => res.json())
            .then(post => {
                postTextEdit.value = post.text;
                const picture = post.picture || `https://via.placeholder.com/346x335.png`;

                postImageEdit.setAttribute('src', picture);

                postAttachEdit.addEventListener('change', (event) => {
                    if (event.target.files && event.target.files[0]) {
                        const reader = new FileReader();
                        reader.readAsDataURL(event.target.files[0]);

                        reader.onload = (event) => {
                            postImageEdit.setAttribute('src', `${event.target.result}`);
                        };
                    }
                });

                const publishHandler = () => {
                    let formData = new FormData();
                    formData.append('text', postTextEdit.value);

                    if (postAttachEdit.files[0]) {
                        formData.append('picture', postAttachEdit.files[0], 'postPicture');
                    }

                    fetch(api, {
                        method: 'PATCH',
                        body: formData
                    })
                    .then(response => response.json())
                    .then(response => {
                        postPublishEdit.removeEventListener('click', publishHandler);
                        const textBlock = event.target.parentElement.parentElement.querySelector(`.js-post__text`);
                        const img = event.target.parentElement.parentElement.querySelector(`.js-post__img`);

                        textBlock.innerHTML = response.text;
                        img.setAttribute('src', response.picture);
                    });


                };

                postPublishEdit.addEventListener('click', publishHandler);
            })
    }

    function createPostListener() {
        postImageCreate.setAttribute('src', 'https://via.placeholder.com/346x335.png');

        const createHandler = () => {
            let formData = new FormData();
            formData.append('text', postTextCreate.value);

            if (postAttachCreate.files[0]) {
                formData.append('picture', postAttachCreate.files[0], 'postPicture');
            } else {
                formData.append('picture', postImageCreate.getAttribute('src'));
            }

            fetch(apiUrl, {
                method: 'POST',
                body: formData
            })
              .then(response => response.json())
              .then((response) => {
                postPublishCreate.removeEventListener('click', createHandler);
                postTextCreate.value = '';
                postAttachCreate.value = '';
                addPost(response);
            });
        };
        postPublishCreate.addEventListener('click', createHandler);

        postAttachCreate.addEventListener('change', (event) => {
            if (event.target.files && event.target.files[0]) {
                const reader = new FileReader();
                reader.readAsDataURL(event.target.files[0]);

                reader.onload = (event) => {
                    postImageCreate.setAttribute('src', `${event.target.result}`);
                };
            }
        });
    };

    function deletePostListener(event) {
      if (!event.target.classList.contains("js-close")) {
        return;
      }

      const id = event.target.previousElementSibling.getAttribute("data-id");

      const api = `${apiUrl}/${id}`;
      fetch(api, {
        method: `DELETE`
      })
        .then((response) => response.json())
        .then(() => {
          event.target.parentElement.parentElement.remove();
        })
    }

})();
