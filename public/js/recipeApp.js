$(document).ready(() => {
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
