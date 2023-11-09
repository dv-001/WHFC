commentsData.sort(function (a, b) { return b.timestamp - a.timestamp });


const commentsSection = document.querySelector("div.container");


function createComment(comment) {
  const commentContainer = document.createElement("div");
  commentContainer.innerHTML = `
  <div class="my-5 p-3 bg-dark-subtle rounded shadow-sm border border-secondary-subtle" style="max-width: 70rem; width: fit-content;">
    <div class="d-flex flex-column text-body-secondary">
      <div class="d-flex flex-row text-body-secondary pt-3">
        <a href="${comment.author_url}" target="_blank">
          <img class="flex-shrink-0 me-2 rounded" src="${comment.author_thumbnail}" width="42" height="42" role="img"
          focusable="false"></img>
        </a>
        <p class="mb-0">
        <a href="${comment.author_url}" target="_blank" class="link-underline link-underline-opacity-0 link-light">
          <strong class="d-block text-gray-dark">${comment.author}</strong>
        </a>
          ${comment.text.replaceAll('\n', '</br>')}
        </p>
      </div>
      <div class="reply-container"></div>
      <hr>
      <span>Commented on:</span>
      <div style="width: 100%; overflow-x: auto; max-width: 88vw;">
        <div class="videos-container" style="display: flex; gap: 1rem; padding: 1rem 0;"></div>
      </div>
    </div>
  </div>
  `;

  return commentContainer;
}


function createReply(comment) {
  const replyContainer = document.createElement("div");
  replyContainer.className = "reply pt-3 px-4 pb-0 m-0 bg-dark-subtle";
  replyContainer.innerHTML = `
  <div class="d-flex text-body-secondary">
    <div class="d-flex flex-row text-body-secondary pt-3">
      <a href="${comment.author_url}" target="_blank">
        <img class="flex-shrink-0 me-2 rounded" src="${comment.author_thumbnail}" width="42" height="42" role="img"
        focusable="false"></img>
      </a>
      <p class="medium lh-sm">
      <a href="${comment.author_url}" target="_blank" class="link-underline link-underline-opacity-0 link-light">
        <strong class="d-block text-gray-dark">${comment.author}</strong>
      </a>
        ${comment.text.replaceAll('\n', '</br>')}
      </p>
    </div>
  </div>
  `;
  return replyContainer;
}


function createOriginalVideoElement(vid_id, vid_title, id) {
  const embed = document.createElement("div");
  embed.innerHTML = `
    <div class="d-flex flex-column p-3 mt-2 rounded border bg-dark shadow" style="max-width: 25rem;">
      <a href="https://www.youtube.com/watch?v=${vid_id}&lc=${id}" target="_blank" title="${vid_title}" class="d-flex flex-column link-underline link-underline-opacity-0 link-light fw-bold link-opacity-75">
        <span class="lh-sm pb-2 text-truncate">${vid_title}</span>
        <img class="object-fit-cover rounded shadow-sm" src="https://i.ytimg.com/vi/${vid_id}/default.jpg" loading="lazy" width="170" height="96">
      </a>
      <!-- <iframe loading="lazy" src="https://www.youtube.com/embed/${vid_id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> -->
    </div>
  `;
  return embed;
}

function displayComments(commentsData) {
  commentsData.forEach(commentData => {
    let comment = createComment(commentData);
    if (commentData.replies) {
      commentData.replies.forEach((element) => {
        let reply = createReply(element);
        comment.querySelector(".reply-container").appendChild(reply)
      });
    }
    if (commentData.videos) {
      commentData.videos.forEach(video => {
        comment.querySelector(".videos-container").appendChild(createOriginalVideoElement(video.video_id, video.video_title, commentData.id))
      });
    } else {
      comment.querySelector(".videos-container").appendChild(createOriginalVideoElement(commentData.video_id, commentData.video_title, commentData.id))
    }
    commentsSection.appendChild(comment);
  });
}

displayComments(commentsData);