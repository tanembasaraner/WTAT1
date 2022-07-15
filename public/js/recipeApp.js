$(document).ready(() => {
  const socket = io();
  $("#chatForm").submit(() => {
    let text = $("#chat-input").val(),
      userName = $("#chat-user-name").val(),
      userId = $("#chat-user-id").val();

    socket.emit("message", {
      content: text,
      userName: userName,
      userId: userId
    });

    $("#chat_input").val("");
    return false;
  });

  socket.on("message", message => {
    displayMessage(message);
    for (let i = 0; i < 2; i++) {
      $(".chat-icon")
        .fadeOut(200)
        .fadeIn(200);
    }
  });

  socket.on("load all messages", data => {
    data.forEach(message => {
      displayMessage(message);
    });
  });

  socket.on("user disconnected", () => {
    displayMessage({
      userName: "Notice",
      content: "User left the chat"
    });
  });

  let displayMessage = message => {
    $("#chat").prepend(
      $("<li>").html(`
				<strong class="message ${getCurrentUserClass(message.user)}">
					${message.userName}
				</strong>: ${message.content}
			`)
    );
  };

  let getCurrentUserClass = id => {
    let userId = $("#chat-user-id").val();
    return userId === id ? "current-user" : "";
  };

  $("#modal-button").click(() => {
    $(".modal-body").html("");
    $.get("/api/travelPackages", (results = {}) => {
      let data = results.data;
      if (!data || !data.travelPackages) return;
      data.travelPackages.forEach(travelPackages => {
        $(".modal-body").append(
          `<div>
						<span class="travelPackages-title">
							${travelPackage.title}
						</span>
						<button class='button ${travelPackages.joined ? "joined-button" : "join-button"}' data-id="${travelPackage._id}">
							${travelPackage.joined ? "Joined" : "Join"}
						</button>
						<div class="travelPackage-description">
							${travelPackage.description}
						</div>
					</div>`
        );
      });
    }).then(() => {
      addJoinButtonListener();
    });
  });
});

let addJoinButtonListener = () => {
  $(".join-button").click(event => {
    let $button = $(event.target),
      travelPackageId = $button.data("id");
    $.get(`/api/travelPackages/${travelPackageId}/join`, (results = {}) => {
      let data = results.data;
      if (data && data.success) {
        $button
          .text("Joined")
          .addClass("joined-button")
          .removeClass("join-button");
      } else {
        $button.text("Try again");
      }
    });
  });
};
