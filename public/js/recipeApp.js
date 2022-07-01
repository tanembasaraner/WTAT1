$(document).ready(() => {
    $("#modal-button").click(() => {
      $(".modal-body").html("");
      $.get("/packages?format=json", data => {
        data.forEach(course => {
          $(".modal-body").append(
            `<div>
                          <span class="package-title">
                              ${package.title}
                          </span>
                          <div class="package-description">
                              ${package.description}
                          </div>
                      </div>`
          );
        });
      });
    });
  });