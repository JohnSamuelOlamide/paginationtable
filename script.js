fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    const numsPerGroup = 5;
    var dataTempStorage = data;
    const length = dataTempStorage.length; //temporary storage variable for data.json
    const n = Math.ceil(length / numsPerGroup);

    //   INPUT SEARCH
    var search_input = document.querySelector(".search-input");

    search_input.addEventListener("keyup", () => {
      dataTempStorage = data.find((val) => {
        return val.Firstname.toLowerCase() == search_input.value.toLowerCase();
      });
      console.log(
        data.find((val) => {
          return (
            val.Firstname.toLowerCase() == search_input.value.toLowerCase()
          );
        })
      );
      populateTable();
    });
    var tableData = new Array(n)
      .fill("")
      .map((_, i) =>
        dataTempStorage.slice(i * numsPerGroup, (i + 1) * numsPerGroup)
      );
    const tdl = tableData.length;
    let tableID = new URLSearchParams(window.location.search).get("page") - 1;
    let thisTable = tableData.filter((table, index) => index == tableID)[0];

    if (!thisTable) {
      window.location.href = "/?page=1";
    }
    //Populate Table
    function populateTable() {
      document.querySelector(".tbody").innerHTML = `
         <tr>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Gender</th>
                </tr>
            `;
      for (i = 0; i < thisTable.length; i++) {
        document.querySelector(".tbody").innerHTML += `
              <tr>
                <td>${thisTable[i].Firstname}</td>
                <td>${thisTable[i].Lastname}</td>
                <td>${thisTable[i].Email}</td>
                <td>${thisTable[i].Phone}</td>
                <td>${thisTable[i].Gender}</td>
              </tr>`;
      }
      const pagination = document.querySelector(".pagination");
      pagination.innerHTML = `<a href="#" onclick="prevPage()" class="prev">Prev</a>`;

      if (tdl + 1 < 10) {
        for (i = 0; i < tdl; i++) {
          pagination.innerHTML += `<a href="/?page=${
            i + 1
          }" class="pag pag-${i + 1}">${i + 1}</a>`;
        }
      } else {
        for (i = 0; i < 5; i++) {
          pagination.innerHTML += `<a href="/?page=${
            i + 1
          }" class="pag pag-${i + 1}">${i + 1}</a>`;
        }
        pagination.innerHTML += `<a href="#" class="pag">...</a>`;
        pagination.innerHTML += `<a href="/?page=${tdl}" class="pag pag-${tdl}">${tdl}</a>`;
        pagination.innerHTML += `<a href="/?page=${
          tdl + 1
        }" class="pag pag-${tdl + 1}">${tdl + 1}</a>`;
      }
      pagination.innerHTML += `<a href="#" onclick="nextPage()" class="next">Next</a>`;
      document
        .querySelector(
          `.pag-${new URLSearchParams(window.location.search).get("page")}`
        )
        .classList.add("active");
    }
    populateTable();
    var currentPage = parseInt(
      new URLSearchParams(window.location.search).get("page")
    );

    function prevPage() {
      if (currentPage == 1) return;
      window.location.href = `/?page=${currentPage - 1}`;
    }
    function nextPage() {
      if (currentPage == tdl + 1) return;
      window.location.href = `/?page=${currentPage + 1}`;
    }
    var prev = document.querySelector(".prev");
    var next = document.querySelector(".next");
    prev.addEventListener("click", prevPage);
    next.addEventListener("click", nextPage);
  });
