import AssignmentState from './../Classes/AssignmentState.js';
const assignmentsStateKey = 'assignmentsState';
const filteredClassesKey = 'filteredClasses';
const optionsKey = 'homieOptions';

initializeAssignmentsState();

function initializeAssignmentsState() {
    let assignmentsState = getAssignmentsState();
    if (!assignmentsState)
        saveAssignmentsState({});

    let filteredList = getFilteredList();
    if (!filteredList)
        resetFilteredList();

    let options = getOptions();
    if (!options) 
        saveOptions({
            date: 1,
            time: 1
        });
}

function changeOption(option, optionValue, cb) {
    let options = getOptions();
    options[option] = optionValue;
    saveOptions(options);

    if (typeof cb === typeof Function)
    cb();
}

function getOptions()  {
    return JSON.parse(localStorage.getItem(optionsKey));
}

function saveOptions(options) {
    localStorage.setItem(optionsKey, JSON.stringify(options));
}

let changeDoneState = (assignmentId, doneState, cb) => {
    changeState(assignmentId, "done", doneState, cb);
}

let changeShowState = (assignmentId, showState, cb) => {
    changeState(assignmentId, "show", showState, cb);
}

let changeState = (assignmentId, state, stateValue, cb) => {
    let assignmentsState = getAssignmentsState();
    assignmentsState[assignmentId][state] = stateValue;
    saveAssignmentsState(assignmentsState);

    if (typeof cb === typeof Function)
        cb();
}

let setupAssignmentsState = (assignments, cb) => {
    //removeOldAssignments(assignments);
    createDefaultStateForNewAssignments(assignments);
    if (typeof cb === typeof Function)
        cb();
}

function refreshViewState(assignments) {
    let assignmentsState = getAssignmentsState();
    return assignments.map((assignment) => {
        assignment.viewState = assignmentsState[assignment.id];
        return assignment;
    });
}

function getAssignmentsState() {
    return JSON.parse(localStorage.getItem(assignmentsStateKey));
}

function saveAssignmentsState(assignmentsState) {
    localStorage.setItem(assignmentsStateKey, JSON.stringify(assignmentsState));
}

function addToFilteredList(filteredClassId, cb) {
    filteredClassId = parseInt(filteredClassId, 10);
    let filteredList = getFilteredList();
    if (filteredList.includes(filteredClassId)) return;

    filteredList.push(filteredClassId);
    saveFilteredList(filteredList);

    if (typeof cb === typeof Function)
        cb();
}

function resetFilteredList() {
    saveFilteredList([]);
}

function saveFilteredList(filteredList) {
    localStorage.setItem(filteredClassesKey, JSON.stringify(filteredList));
}

function getFilteredList() {
    return JSON.parse(localStorage.getItem(filteredClassesKey));
}


module.exports = {
    setupAssignmentsState: setupAssignmentsState,
    changeDoneState: changeDoneState,
    changeShowState: changeShowState,
    refreshViewState: refreshViewState,
    getFilteredList: getFilteredList,
    addToFilteredList: addToFilteredList,
    resetFilteredList: resetFilteredList,

    getOptions: getOptions,
    changeOption: changeOption
}

function createDefaultStateForNewAssignments(assignments) {
    let assignmentsState = getAssignmentsState();
    let assignmentsLength = assignments.length;

    for (let i = 0; i < assignmentsLength; i++) {
        let assignment = assignments[i];
        let assignmentID = assignment.id;
        if (!assignmentsState[assignmentID]) {
            assignmentsState[assignmentID] = new AssignmentState();
        }
    }

    saveAssignmentsState(assignmentsState);
}

// function removeOldAssignments(assignments) {
//     let assignmentsState = getAssignmentsState();
//     let newAssignments = {};
//     for (let id in assignmentsState) {
//         let filteredClasses = getFilteredList();
//         if (assignmetsContains(assignments, id)) {
//             newAssignments[id] = assignmentsState[id];
//         }
//     }
//     saveAssignmentsState(newAssignments);
// }

function assignmetsContains(assignmets, id) {
    let found = false;
    let assignmentsLength = assignmets.length;

    for (let i = 0; i < assignmentsLength; i++) {
        if (assignmets[i].id == id) {
            found = true;
            break;
        }
    }
    return found;
}

function assignmentIsFiltered(filteredClasses, id) {

    let found = false;
    let filteredClassesLength = filteredClasses.length;

    for (let i = 0; i < filteredClassesLength; i++) {
        if (`a${filteredClasses[i]}` == id) {
            found = true;
            break;
        }
    }
    return found;
}