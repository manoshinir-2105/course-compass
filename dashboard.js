if (
    localStorage.getItem("loggedIn")
    !== "true"
) {
    window.location.href =
        "login.html";
}

let plans =
JSON.parse(
localStorage.getItem("plans")
) || [];

function savePlans() {

    localStorage.setItem(
        "plans",
        JSON.stringify(plans)
    );

    renderPlans();
}

function addPlan() {

    const title =
    document.getElementById("title").value;

    const goal =
    document.getElementById("goal").value;

    if (!title || !goal) {
        alert("Fill all fields");
        return;
    }

    plans.push({
        title,
        goal
    });

    document.getElementById("title").value="";
    document.getElementById("goal").value="";

    savePlans();
}

function editPlan(index) {

    const newTitle =
    prompt(
        "Edit Title",
        plans[index].title
    );

    const newGoal =
    prompt(
        "Edit Goal",
        plans[index].goal
    );

    if(newTitle && newGoal){

        plans[index]={
            title:newTitle,
            goal:newGoal
        };

        savePlans();
    }
}

function deletePlan(index){

    plans.splice(index,1);

    savePlans();
}

function renderPlans(){

    const container =
    document.getElementById("plans");

    container.innerHTML="";

    plans.forEach((plan,index)=>{

        container.innerHTML += `
        <div class="plan-card">

            <h2>${plan.title}</h2>

            <p>${plan.goal}</p>

            <div class="actions">

                <button
                onclick="editPlan(${index})">
                Edit
                </button>

                <button
                onclick="deletePlan(${index})">
                Delete
                </button>

            </div>

        </div>
        `;
    });
}

function logout(){

    localStorage.removeItem(
        "loggedIn"
    );

    window.location.href =
    "login.html";
}

renderPlans();