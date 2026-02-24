let interviewList = [];
let rejectedlist = [];
let currentStatus = 'all'

const allJobsBtn = document.getElementById("allJobsBtn");
const interviewJobsBtn = document.getElementById("interviewJobsBtn");
const rejectedJobsBtn = document.getElementById("rejectedJobsBtn");

const mainContainer = document.querySelector("main");
const allCardSection = document.querySelector(".allCard");
const filterSection = document.getElementById("filter-section");

let jobNumber = document.getElementById("jobNumber");

let totalCount = document.getElementById("total");
let interviewCount = document.getElementById("interview-count");
let rejectedCount = document.getElementById("rejected-count");
let availablejobsCount = document.getElementById("availablejobsCount");

// Available Jobs Button Available Jobs Button Available Jobs Button Available Jobs Button
function toggleStyle(id) {
  allJobsBtn.classList.add("bg-[#ffffff]", "text-gray-600");
  interviewJobsBtn.classList.add("bg-[#ffffff]", "text-gray-600");
  rejectedJobsBtn.classList.add("bg-[#ffffff]", "text-gray-600");

  allJobsBtn.classList.remove("bg-blue-500", "text-white");
  interviewJobsBtn.classList.remove("bg-blue-500", "text-white");
  rejectedJobsBtn.classList.remove("bg-blue-500", "text-white");

  const selected = document.getElementById(id);
  currentStatus = id

  selected.classList.add("bg-blue-500", "text-white");
  selected.classList.remove("bg-[#ffffff]", "text-gray-600");

  if (id == "interviewJobsBtn") {
    allCardSection.classList.add("hidden");
    filterSection.classList.remove("hidden");
    renderInterView();
  } else if (id == "allJobsBtn") {
    allCardSection.classList.remove("hidden");
    filterSection.classList.add("hidden");
  } else if (id == "rejectedJobsBtn") {
    allCardSection.classList.add("hidden");
    filterSection.classList.remove("hidden");
    renderReject();
  }
}

// Jobs Count  Jobs Count  Jobs Count Jobs Count Jobs Count Jobs Count
function calculateCount() {
  const total = allCardSection.children.length;
  interviewCount.innerText = interviewList.length;
  totalCount.innerText = total;
  jobNumber.innerText = total;
  rejectedCount.innerText = rejectedlist.length;
}
calculateCount();

// Main Main Main Main Main Main Main Main Main Main Main
mainContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-interview")) {
    const parentNode = e.target.closest(".job-card");
    const jobCompany = parentNode.querySelector(".job-company").innerText;
    const jobTitle = parentNode.querySelector(".job-title").innerText;
    const jobMeta = parentNode.querySelector(".job-meta").innerText;
    const jobStatus = parentNode.querySelector(".job-status");
    const jobDescription = parentNode.querySelector(".job-description").innerText;

    jobStatus.innerText = "INTERVIEW";

    parentNode.classList.remove("border-l-4", "border-[#f43098]");
    jobStatus.classList.remove("btn-secondary");
    jobStatus.classList.add("btn", "btn-soft", "btn-success");
    parentNode.classList.add("border-l-4", "border-[#00d390]");

    jobStatus.classList.remove(
      "bg-[#eef4ff]",
      "rounded-md",
      "p-2",
      "font-semibold",
    );

    const jobInfo = {
      jobCompany,
      jobTitle,
      jobMeta,
      jobStatus: "INTERVIEW",
      jobDescription,
    };
    const jobExist = interviewList.find(
      (item) => item.jobCompany == jobInfo.jobCompany,
    );

    if (!jobExist) {
      interviewList.push(jobInfo);
    }

    rejectedlist = rejectedlist.filter(item => item.jobCompany != jobInfo.jobCompany)


    if (currentStatus == 'rejectedJobsBtn') {
      renderReject()
    } else if (currentStatus == 'interviewJobsBtn')
      renderInterView()
    
    calculateCount();

  } else if (e.target.classList.contains("btn-rejected")) {
    const parentNode = e.target.closest(".job-card");
    const jobCompany = parentNode.querySelector(".job-company").innerText;
    const jobTitle = parentNode.querySelector(".job-title").innerText;
    const jobMeta = parentNode.querySelector(".job-meta").innerText;
    const jobStatus = parentNode.querySelector(".job-status");
    const jobDescription = parentNode.querySelector(".job-description").innerText;

    jobStatus.innerText = "REJECTED";

    parentNode.classList.remove("border-l-4", "border-[#00d390]");
    jobStatus.classList.remove('btn-success')
    jobStatus.classList.add("btn", "btn-soft", "btn-secondary")
    parentNode.classList.add("border-l-4", "border-[#f43098]")


    jobStatus.classList.remove(
      "bg-[#eef4ff]",
      "rounded-md",
      "p-2",
      "font-semibold",
      "btn-success",
    );

    const jobInfo = {
      jobCompany,
      jobTitle,
      jobMeta,
      jobStatus: "REJECTED",
      jobDescription,
    };
    const jobExist = rejectedlist.find(
      (item) => item.jobCompany == jobInfo.jobCompany,
    );

    if (!jobExist) {
      rejectedlist.push(jobInfo);
    }

    interviewList = interviewList.filter(item => item.jobCompany != jobInfo.jobCompany)
    
    if (currentStatus == 'rejectedJobsBtn') {
      renderReject()
    } else if (currentStatus == 'interviewJobsBtn')
      renderInterView()
    
    calculateCount();


  } else if (e.target.closest('.delete-btn')) {
    const parenNode = e.target.closest('.job-card')
    const jobCompany = parenNode.querySelector('.job-company').innerText

    interviewList = interviewList.filter(item => item.jobCompany !== jobCompany)
    rejectedlist = rejectedlist.filter(item => item.jobCompany !== jobCompany)
    
    parenNode.remove()

    if (currentStatus === "interviewJobsBtn") {
    renderInterView();
    } 
    else if (currentStatus === "rejectedJobsBtn") {
      renderReject();
    }
    calculateCount();

  }
});

// renderInterView renderInterView renderInterView renderInterView
function renderInterView() {
  filterSection.innerHTML = "";

  for (let interView of interviewList) {
    let div = document.createElement("div");
    div.className =
      "job-card flex justify-between bg-[#ffffff] p-7 shadow-sm mt-7 border-l-4 border-[#00d390]";
    div.innerHTML = `<!-- left side  -->
                <div>
                    <h4 class="job-company text-[22px] font-semibold text-[#002c5c]">${interView.jobCompany}</h4>
                    <p class=" job-title text-gray-600">${interView.jobTitle}</p>
                    <p class="job-meta py-5 text-gray-600">${interView.jobMeta}</p>
                    <button class="job-status btn btn-soft btn-success">${interView.jobStatus}</button>
                    <p class="job-description pt-2 text-gray-600">${interView.jobDescription}</p>
                    <div class="py-4 flex gap-4">
                        <button class=" btn-interview btn btn-outline btn-success">INTERVIEW</button>
                        <button class="btn-rejected btn btn-outline btn-secondary">REJECTED</button>
                    </div>
                </div>
                <!-- right side  -->
                <div>
                    <span class=" delete-btn bg-gray-50 border-gray-300 text-gray-500 border p-2 rounded-full"><i class="fa-regular fa-trash-can"></i></span>
                </div>`;
    filterSection.append(div);
  }
}

// renderReject renderReject renderReject renderReject renderReject
function renderReject() {
  filterSection.innerHTML = "";

  for (let reject of rejectedlist) {
    let div = document.createElement("div");
    div.className =
      "job-card flex justify-between bg-[#ffffff] p-7 shadow-sm mt-7 border-l-4 border-[#f43098]";
    div.innerHTML = `<!-- left side  -->
                <div>
                    <h4 class="job-company text-[22px] font-semibold text-[#002c5c]">${reject.jobCompany}</h4>
                    <p class=" job-title text-gray-600">${reject.jobTitle}</p>
                    <p class="job-meta py-5 text-gray-600">${reject.jobMeta}</p>
                    <button class="job-status btn btn-soft btn-secondary">${reject.jobStatus}</button>
                    <p class="job-description pt-2 text-gray-600">${reject.jobDescription}</p>
                    <div class="py-4 flex gap-4">
                        <button class=" btn-interview btn btn-outline btn-success">INTERVIEW</button>
                        <button class="btn-rejected btn btn-outline btn-secondary">REJECTED</button>
                    </div>
                </div>
                <!-- right side  -->
                <div>
                    <span class="delete-btn bg-gray-50 border-gray-300 text-gray-500 border p-2 rounded-full"><i class="fa-regular fa-trash-can"></i></span>
                </div>`;
    filterSection.append(div);
  }
}
