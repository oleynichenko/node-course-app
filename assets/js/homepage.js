document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = '/api/posts';
    const commentsUrl = '/api/comments';
    const commentUrl = '/api/comment';

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

    const commentText = document.getElementById('commentText');
    const commentPublish = document.getElementById('commentPublish');

    const commentTextEdit = document.getElementById('commentTextEdit');
    const commentPublishEdit = document.getElementById('commentPublishEdit');
    const logout = document.getElementById('logout-box');
    let actualPosts = [];

    init();

    function init() {
      if (localStorage.getItem('token')) {
        body.classList.remove('hide');

        const apiToken = localStorage.getItem('token');
        const headers = new Headers();
        headers.append('Authorization', apiToken);

        fetch(apiUrl, {
          method: 'GET',
          headers: headers
        })
          .then(response => response.json())
          .then(response => {
              actualPosts = response;
              renderPosts(actualPosts);
              renderComments(actualPosts);
              initListeners();
          })
          .catch(e => console.log(e));
      } else {
        window.location = '/signin'
      }
    }

    function getEditBtnTemplate(post) {
      return `<a href="#postModalEdit" class="boa" data-toggle="modal" data-id="${post.id}"><button class="cg nz ok js-post-edit" data-id="${post.id}">Редактировать пост</button></a>`
    }

    function getDeleteBtnTemplate() {
      return `<button type="button" class="close js-close" aria-hidden="true" title="Удалить">×</button>`
    }

    function getImgTemplate(picture) {
      return `<div class="boy" data-grid="images">
        <img class="js-post__img" 
          style="display: inline-block; 
            width: 346px; 
            height: 335px; 
            margin-bottom: 10px; 
            margin-right: 0px; 
            vertical-align: bottom;" 
          data-width="640" data-height="640" data-action="zoom" src="${picture}">
      </div>`;
    }

    function getPostTemplate(post) {
      const imgBlock = (post.picture) ? getImgTemplate(post.picture) : ``;
      const editBtn = (post.editable) ? getEditBtnTemplate(post) : ``;
      const deleteBtn = (post.editable) ? getDeleteBtnTemplate() : ``;

      return `<li class="rv b agz">
          <img class="bos vb yb aff" src="${post.author.avatar}">
          <div class="rw">
          
            <div class="bpb">
              <small class="acx axc">${moment(post.publicationDate).format('YYYY-MM-DD HH:mm')}</small>
              <h6>${post.author.firstName} ${post.author.lastName}</h6>
            </div>
            
            <p class="js-post__text">${post.text}
            </p>
            ${imgBlock}
            ${editBtn}            
            <a href="#postModalComment" class="boa" data-toggle="modal" for="comment" data-id="${post.id}">
               <button class="cg nz ok" data-id="${post.id}" for="comment" title="Оставить комментарий">Оставить комментарий</button>
            </a>
            ${deleteBtn}
            <hr>
            <ul class="bow afa commentBlock" id="comment-${post.id}">
            </ul>
          </div>
        </li>`
    }

    function getCommentTemplate(comment) {
      return `<li class="rv afh">
                <div class="qa">
                    <div class="rv">
                        <img class="bos us aff yb" src="${comment.user.avatar}">
                        <div class="rw">
                            <div class="bpd">
                                <div class="bpb">
                                    <small class="acx axc">${moment(comment.publicationDate).fromNow()}</small>
                                    <h6>${comment.user.firstName} ${comment.user.lastName}</h6>
                                </div>
                                <div class="bpb">${comment.text}</div>
                                <a href="#postModalCommentEdit" class="boa" data-toggle="modal" for="edit-comment" data-id=${comment._id}>
                                    <button type="button" class="cg axo axu oh" data-id=${comment._id} for="edit-comment" title="Оставить комментарий">Редактировать комментарий</button>
                                </a>
                                <button type="button" class="close js-comment-close" aria-hidden="true" data-id=${comment._id} title="Удалить">×</button>
                            </div>
                        </div>
                    </div>
                </div>
              </li>`
    }

    function renderPosts(posts) {
        feed.innerHTML = '';
        posts.forEach(post => {
            feed.innerHTML += getPostTemplate(post);
        })
    }

    function renderPostComments(postId) {
      const commentBlock = document.getElementById(`comment-${postId}`);
      fetch(`${commentsUrl}/${postId}`)
        .then(response => response.json())
        .then(response => {
          let template = ``;

          response.forEach(comment => {
            template += getCommentTemplate(comment);
          });

          commentBlock.innerHTML = template;
        });
    }

    function renderComments(posts) {
      posts.forEach(post => {
        renderPostComments(post.id);
      });
    }

    function addPost(id) {
      const apiToken = localStorage.getItem('token');
      const headers = new Headers();
      headers.append('Authorization', apiToken);

      fetch(`${apiUrl}/${id}`, {
        method: 'GET',
        headers
      })
        .then(res => res.json())
        .then(post => {
          feed.insertAdjacentHTML(`afterBegin`, getPostTemplate(post));
        })
    }

    function addComment(postId, id) {
      fetch(`${commentUrl}/${id}`, {
        method: `GET`
      })
        .then((res) => res.json())
        .then((comment) => {
          const commentBlock = document.getElementById(`comment-${postId}`);
          commentBlock.insertAdjacentHTML(`beforeEnd`, getCommentTemplate(comment));
        })
    }

    function initListeners() {
        createPost.addEventListener('click', createPostListener);
        feed.addEventListener('click', editPostListener);
        feed.addEventListener('click', deletePostListener);
        feed.addEventListener('click', publishCommentListener);
        feed.addEventListener('click', editCommentListener);
        feed.addEventListener('click', deleteCommentListener);
        logout.addEventListener('click', logOutListener);
    }

    function editPostListener(event) {

        if (event.target.getAttribute("href") !== `#postModalEdit` && !event.target.classList.contains(`js-post-edit`)) {
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

                        const liBlock = event.target.parentElement.parentElement;
                        const textBlock = liBlock.querySelector(`.js-post__text`);
                        textBlock.innerHTML = response.text;

                        const picture = response.picture;

                        if (picture) {
                          let img = liBlock.querySelector(`.js-post__img`);

                          if (!img) {
                            textBlock.insertAdjacentHTML(`afterEnd`, getImgTemplate(picture));
                          } else {
                            img.setAttribute('src', picture);
                          }
                        }
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

            const apiToken = localStorage.getItem('token');
            const headers = new Headers();
            headers.append('Authorization', apiToken);

            fetch(apiUrl, {
                method: 'POST',
                body: formData,
                headers
            })
              .then(response => response.json())
              .then((response) => {
                postPublishCreate.removeEventListener('click', createHandler);
                postTextCreate.value = '';
                postAttachCreate.value = '';

                addPost(response.id);
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
        .then(() => {
          event.target.parentElement.parentElement.remove();
        })
    }

    function publishCommentListener(event) {
      if (!event.target.getAttribute("data-id") || event.target.getAttribute('for') !== 'comment') {
        return;
      }

      const postId = event.target.getAttribute("data-id");

      const createHandler = () => {
        let formData = new FormData();
        formData.append('text', commentText.value);
        formData.append('postId', postId);

        const url = `${commentsUrl}/${postId}`;

        fetch(url, {
          method: 'POST',
          body: formData
        })
          .then(response => response.json())
          .then((response) => {
            commentPublish.removeEventListener('click', createHandler);
            commentText.value = '';
            addComment(postId, response._id);
          });

      };

      commentPublish.addEventListener('click', createHandler);

    }

    function editCommentListener(event) {
      if (event.target.getAttribute('for') !== 'edit-comment') {
        return;
      }

      const commentId = event.target.getAttribute("data-id");

      fetch(`${commentUrl}/${commentId}`)
        .then(res => res.json())
        .then(comment => {
          commentTextEdit.value = comment.text;

          const editCommentHandler = () => {
            let formData = new FormData();
            formData.append('text', commentTextEdit.value);
            formData.append('_id', comment._id);

            fetch(`${commentUrl}/${commentId}`, {
              method: 'PATCH',
              body: formData
            }).then(() => {
              commentPublishEdit.removeEventListener('click', editCommentHandler);
              const commentBlock = event.target.closest(`.commentBlock`);
              const postId = +commentBlock.id.split(`-`)[1];
              renderPostComments(postId);
            });
          };

          commentPublishEdit.addEventListener('click', editCommentHandler);
        });
    }

    function deleteCommentListener(event) {
      if (!event.target.classList.contains("js-comment-close")) {
        return;
      }

      const id = event.target.getAttribute("data-id");

      fetch(`${commentUrl}/${id}`, {method: 'DELETE'})
        .then(() => {
          const commentBlock = event.target.closest(`.commentBlock`);
          const postId = +commentBlock.id.split(`-`)[1];
          renderPostComments(postId);
        })
    }

    function logOutListener(event) {
      event.preventDefault();
      console.log(23);
      localStorage.clear();
      setTimeout(() => {
        window.location = '/signin';
      }, 1000)
    }
});
