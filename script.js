function Hello() {
    alert("Hello, World");
}

var baseurl = "http://localhost:8081/";

function getSampleRelation(taskId) {
    if (taskId != null && taskId.length > 0) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", baseurl + "get_sample_relations?task_id=" + taskId, true);
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                var persons = JSON.parse(xmlhttp.responseText);
                var tbltop = `<table>
			    <tr><th>Entity 1</th><th>Relation</th><th>Entity 2</th></tr>`;
                //main table content we fill from data from the rest call
                var main = "";
                for (i = 0; i < persons.length; i++) {
                    main += "<tr><td>" + persons[i].head + "</td><td>" + persons[i].type + "</td><td>" + persons[i].tail + "</td></tr>";
                }
                var tblbottom = "</table>";
                var tbl = tbltop + main + tblbottom;
                document.getElementById("personinfo").innerHTML = tbl;
            }
        };
        xmlhttp.send();
    } else {
        alert("Kindly enter a Task Id");
    }
}

//Testing Done 🫠
function getTaskStatus(taskId) {
    if (taskId != null && taskId.length > 0) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", baseurl + "get_ingestion_status?task_id=" + taskId, true);
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                var persons = xmlhttp.responseText;
                if (persons === "IN_PROGRESS") {
                    document.getElementById("inProgressButton").innerHTML = `<button style="background: palevioletred">In-Progress</button>`;
                    document.getElementById("doneButton").innerHTML = ``;
                    document.getElementById("checkSampleRelationButton").innerHTML = ``;
                } else {
                    document.getElementById("inProgressButton").innerHTML = ``;
                    document.getElementById("doneButton").innerHTML = `<button style="background: mediumseagreen">Done</button>`;
                    document.getElementById("checkSampleRelationButton").innerHTML = `<button type="button" onclick = "getSampleRelation(document.getElementById('taskId').value);">Check Sample Relations</button>`
                }
            }
        };
        xmlhttp.send();
    } else {
        alert("Kindly enter a Task Id");
    }
}

function askQuestion(question, graphName) {
    if (question != null && question.length > 0) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", baseurl + "search_template", true);
        xmlhttp.setRequestHeader("Accept", "application/json");
        xmlhttp.setRequestHeader("Content-Type", "text/plain");
        // xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
        //xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
        // xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
        // xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Content-Type, Depth, User-Agent, X-File-Size, Origin, Accept, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                document.getElementById("answer").innerHTML = JSON.parse(xmlhttp.responseText);
            }
        };
        xmlhttp.send(JSON.stringify({"question": question, "graphName": graphName}));
    } else {
        alert("Kindly enter a Question");
    }
}

function createGraph(graphName, inputType, kgData) {
    if (inputType != null && inputType.length > 0 && kgData != null && kgData.length > 0) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", baseurl + "extract_relations", true);
        xmlhttp.setRequestHeader("Accept", "application/json");
        xmlhttp.setRequestHeader("Content-Type", "text/plain");
        // xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
        //xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
        // xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
        // xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Content-Type, Depth, User-Agent, X-File-Size, Origin, Accept, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                document.getElementById("taskId").innerHTML = JSON.parse(xmlhttp.responseText);
            }
        };
        xmlhttp.send(JSON.stringify({"data": kgData, "graphName": graphName, "inputType": inputType}));
    } else {
        alert("Kindly enter Data and Select an InputType");
    }
}

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

function getRelationNameList() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", baseurl + "/get_relation_list", true);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            const relationSelect = document.getElementById("relationSelect");
            var relationNameList = JSON.parse(xmlhttp.responseText);
            //main table content we fill from data from the rest call
            var optionList = "";
            for (let i = 0; i < relationNameList.length; i++) {

                const newOption = document.createElement("option");
                newOption.value = relationNameList[i];
                newOption.text = relationNameList[i];
                relationSelect.appendChild(newOption);
                console.log(relationSelect);
            }
        }
    };
    xmlhttp.send();
}

function getPatternsList(relation) {
    if (relation != null && relation.length > 0) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", baseurl + "get_template?relation=" + relation, true);
        xmlhttp.onreadystatechange = function () {
            let main;
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                const patterns = document.getElementById("patterns");
                var patternListResponse = JSON.parse(xmlhttp.responseText);
                main = "Patterns : <br>"
                for (let i = 0; i < patternListResponse.length; i++) {
                    main += "<p> -- " + patternListResponse[i] + "</p><br>";
                }
                console.log(main);
                document.getElementById("patterns").innerHTML = main;
            }
        };
        xmlhttp.send();
    } else {
        alert("Kindly enter a Relation");
    }
}

function addPattern(relation, pattern, entityGroup) {
    if (relation != null && relation.length > 0 && pattern != null && pattern.length > 0 && entityGroup != null && entityGroup.length > 0) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", baseurl + "add_template", true);
        xmlhttp.setRequestHeader("Accept", "application/json");
        xmlhttp.setRequestHeader("Content-Type", "text/plain");
        // xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
        // xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
        // xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
        // xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Content-Type, Depth, User-Agent, X-File-Size, Origin, Accept, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");
        // xmlhttp.onreadystatechange = function () {
        //     if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        //         document.getElementById("taskId").innerHTML = JSON.parse(xmlhttp.responseText);
        //     }
        // };
        xmlhttp.send(JSON.stringify({
            "relation": relation,
            "template": pattern,
            "entity_group": entityGroup.toString().replaceAll(" ", "")
        }));
    } else {
        alert("Kindly enter Data, Input Type and the Entity Group");
    }
}

window.onload = function () {
    getRelationNameList();
};
