function generateBox(){
    var box = document.createElement("div");
    box.setAttribute("id", "exercise-box");
    box.style.cssText = "width: 500px; height: 600px; background-color: #e3e8eb; \
                        color: #000000; border-color: #000000; box-shadow: 0 0 3px black; \
                        font-size: 20px; z-index: 10000; position: absolute; bottom: 0; right: 0;";
    box.innerHTML = `<div id="attempts" style="height:25px; display:inline-block; background-color: #e3e8eb">
                    </div>
                    <div id="title" style="height: 50px; background-color: #aabbc3; text-decoration: underline; \
                                           display: flex; align-items: center; justify-content: center;\
                                           font-family: 'Roboto Slab'; font-size: 32px;"> 
                    </div>
                    <div id="description" style="height: 450px; background-color: #e3e8eb; margin: 5px 15px 0 15px;"> 
                    </div>
                    <div id="buttons" style="height: 75px; background-color: #aabbc3; display: border-top: 2px solid #c7d2d7; flex; align-items: center;">
                        <button id="left-but" style="position: absolute; left: 10px; bottom: 15px; padding: 20px 20px; width: 125px; \
                                                    display: inline-flex; align-items: center; justify-content: center;"> Previous </button>
                        <button id="right-but" style="position: absolute; right: 10px; bottom: 15px; padding: 20px 20px; width: 125px; \
                                                     display: inline-flex; align-items: center; justify-content: center;"> Next </button>
                    </div>
                    `;
    return box
};

function generateMinBox(){
    var minBox = document.createElement("div");
    minBox.setAttribute("id", "min-exercise-box");
    minBox.style.cssText = "display: none; width: 50px; height: 50px; background-color: #e3e8eb; \
                        color: #000000; border-color: #000000; box-shadow: 0 0 3px black; \
                        font-size: 20px; z-index: 10000; position: absolute; bottom: 0; right: 0;";
    minBox.innerHTML = `<button id="expand"> <i class="fa fa-chevron-circle-up" aria-hidden="true"></i> </button>`
    return minBox
};

function stopClicks(){
    $("#left-but").off("click");
    $("#right-but").off("click");
};

function defaultButtonsConfig(rightText="Validate"){
    $("#left-but").css("display", "inline-flex");
    $("#left-but").text("Go Back");
    $("#right-but").text(rightText);
};

function getProcessorElement(processorName){
    const processors = $(".processors").children();
    var processorElement = null
    processors.each(function(i, processor){
        const processorText = $($(processor).find(".processor-name")).immediateText();
        if (processorText == processorName){
            processorElement = processor
            return false
        }
    });
        if (processorElement == null){
            console.log("The processor", processorName, "is not on the Canvas");
    };
    return processorElement
};

function getProcessGroupElement(processGroupName){
    const processGroups = $(".process-groups").children();
    var processGroupElement = null
    processGroups.each(function(i, processor){
        const processorText = $($(processor).find(".process-group-name")).immediateText();
        if (processorText == processGroupName){
            processGroupElement = processor
            return false
        }
    });
        if (processGroupElement == null){
            console.log("The Process Group", processGroupName, "is not on the Canvas");
    };
    return processGroupElement
};

function checkExistingProcessGroup(processGroupName){
    let processGroup = getProcessGroupElement(processGroupName);
    if (processGroup != null){
        return true
    }else{
        return false
    }
};

function resetFont(){
    $("b").attr("style","font-weight: bold;");
    $("em").attr("style","font-style: italic;");
};

function exit(){
    var destroyDiv = "<div id='destroyWindow'></div>";
    $("body").append(destroyDiv);
};

$.fn.immediateText = function(){return this.contents().not(this.children()).text();};

$.fn.highlight = function(){$(this).css("background", highlightColor);}
$.fn.unhighlight = function(){$(this).css("background", "");}

$.fn.id = function(){return $(this).attr("id")};
$.fn.hashId = function(){return "#" + $(this).attr("id")};

$.fn.highlightMenu = function(text){
    var idItemText = $(`.context-menu-item:contains(${text})`).hashId();
    $(this).contextmenu(()=>{$(idItemText).highlight()});
};
$.fn.unhighlightMenu = function(text){
    var idItemText = $(`.context-menu-item:contains(${text})`).hashId();
    $(this).contextmenu(()=>{$(idItemText).unhighlight()});
};

$.fn.highlightProcessGroup = function(){
    $(`${this.hashId()} .border`).height(182);
    $(`${this.hashId()} .border`).width(390);
    $(`${this.hashId()} .border`).attr("fill", highlightColor)
};
$.fn.unhighlightProcessGroup = function(){
    $(`${this.hashId()} .border`).height(172);
    $(`${this.hashId()} .border`).width(380);
    $(`${$(this).hashId()} .border`).attr("fill", "transparent")
};

$.fn.highlightProcessor = function(){
    $(`${this.hashId()} .border`).height(140);
    $(`${this.hashId()} .border`).width(360);
    $(`${this.hashId()} .border`).attr("fill", highlightColor)
};
$.fn.unhighlightProcessor = function(){
    $(`${this.hashId()} .border`).height(130);
    $(`${this.hashId()} .border`).width(350);
    $(`${$(this).hashId()} .border`).attr("fill", "transparent")
};

const processGroupNameExercise = "my_first_flow";
const highlightColor = "#ffb3b3";
const highlightTransparentColor = "#ffb3b380";
let nRemainingAttempts = 3;
let processGroupRoot = "unfound";
let generateFlowFileID = null;
const box = generateBox();
$('body').append(box);
const minBox = generateMinBox();
$('body').append(minBox);
$('head').append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css" type="text/css" title="cdnIcons"/>');


function deletePreviousExerciseBox(){
    // Actions on GUI
    stopClicks();
    const processGroup = getProcessGroupElement(processGroupNameExercise);
    $(processGroup).highlightProcessGroup();
    const repeatedInterval = setInterval(function() {
        if ($("#title").text() == "Delete Previous Exercise") {
            $("#stop-menu-item").highlight();
            $("#delete-menu-item").highlight();
            };
        if ($("#title").text() == 'Nifi 101'){
            $("#stop-menu-item").unhighlight();
            $("#delete-menu-item").unhighlight();
            $(processGroup).unhighlightProcessGroup();
            clearInterval(repeatedInterval);
            };
        }
    , 100); 
    //Text
    $("#title").html("<p>Delete Previous Exercise</p>");
    $("#description").html("<p> This is not the first time you are making this exercise. Please delete your previous Process Group \"my_first_flow\" \
                            so that the validations can be done properly and you can start this exercise from scratch.<br><br>\
                            You will have to stop any processors that are still running. Right click on the ProcessGroup and select \"Stop\" \
                            from the context menu, then right click again and select \"Delete\".\
                            When the ProcessGroup is deleted click on \"Validate\".</p>");
    resetFont();
    // Buttons
    defaultButtonsConfig();
    $("#left-but").hide();
    $("#right-but").click(deletePreviousExerciseVal);
};

function deletePreviousExerciseVal(){
    stopClicks();
    if (!checkExistingProcessGroup(processGroupNameExercise)){
        welcomeBox();
    }
    else{
        Error(deletePreviousExerciseBox);
    }
};

function welcomeBox(){
    stopClicks();
    $("#attempts").html(`<button id="contract" style="height:25px"> <i class="fa fa-chevron-circle-down" aria-hidden="true"></i> </button> \
                        <p style="display:inline-block; position: absolute; right: 5px;">Remaining attempts: ${String(nRemainingAttempts)}</p>`);
    // Check if there is an existing Process Group my_first_flow from a previous exericse attempt
    if (checkExistingProcessGroup(processGroupNameExercise)){
        console.log("está repetido")
        deletePreviousExerciseBox();
        return
    }
    // Actions on GUI
    $("#canvas-container").css("background", "");
    //Text
    $("#title").html("<p>Nifi 101</p>");
    $("#description").html("<p>Hello and welcome to this tutorial! <br> \
                            <img src='https://i.ibb.co/4MX35yP/157-1579683-chuck-norris-png-background-chuck-norris-meme-log.jpg'\
                            style='width:250px; margin-left: 25%;'> <br><br>\
                            My name is Chuck Nifi, I will be guiding you through your first steps in this App. \
                            In this lesson you are going to learn the <b>basics and fundamentals</b> about \
                            how this program works and how to use it for developing Integrations.</p>");
    resetFont();
    // Buttons
    defaultButtonsConfig();
    $("#left-but").css("display", "none");
    $("#right-but").text("Next");
    $("#right-but").click(() => {canvasSelectedBox()});
    $("#contract").click(function(){$("#min-exercise-box").css("display", "block"); $("#exercise-box").css("display", "none")});
    $("#expand").click(function(){$("#min-exercise-box").css("display", "none"); $("#exercise-box").css("display", "block")});
};
welcomeBox();

function canvasSelectedBox()
    // Actions on GUI
    {stopClicks();
    $("#canvas-container").highlight();
    $("#group-component").css("background", "");
    $("#group-component").mouseout();
    $(".birdseye-brush.moveable").unhighlight();
    //Text
    $("#title").html("<p> Canvas </p>");
    $("#description").html("<p> There are many components in Nifi, on this Tutorial you will start getting familiarized with them. <br><br> \
                            I am going to start by telling you about the canvas, I have higlighted in red so that you can easily identify it. \
                            Like artists who use their canvas to draw their paintings, this will be the <b>matrix</b> on which we develop \
                            our Integrations. <br><br> \
                            <img src='https://i.ibb.co/t3sTgV7/chuck-norris-stars-on-art-canvas-print.jpg'\
                                      style='width:175px; margin-left: 32%;'><br><br> </p>");
    resetFont();
    // Buttons
    defaultButtonsConfig();
    $("#left-but").css("display", "inline-flex");
    $("#left-but").click(() => {welcomeBox()});
    $("#right-but").text("Next");
    $("#right-but").click(() => {nifiGuiBox()});
};

function nifiGuiBox(){
    // Actions on GUI
    stopClicks();
    $("#canvas-container").css("background", "");
    $(".fa-search-minus").css("background", "");
    $(".fa-search-plus").css("background", "");
    $(".birdseye-brush.moveable").css("fill", "");
    //Text
    $("#title").html("<p> NIFI as a GUI </p>");
    $("#description").html("<p> One of the main advantages of Nifi is that flows are displayed <b>visually</b>, \
                            so you will get a graphic understanding of the processes involved. Its GUI (Graphical User Interface)\
                            will allow you to develop your flows without the need to write any code. Don't be afraid, a flow is composed \
                            only of boxes and arrows connected between each other! <br><br>\
                            Always try to keep your elements on the canvas tidy and properly located for improving the readibility \
                            of your work and allowing others to understand it more easily.</p>");
    resetFont();
    // Buttons
    defaultButtonsConfig();
    $("#left-but").click(canvasSelectedBox);
    $("#right-but").text("Next");
    $("#right-but").click(() => {birdsEyeBox()});
};

function birdsEyeBox(){
    // Actions on GUI
    stopClicks();
    $(".fa-search-minus").css("background", highlightColor);
    $(".fa-search-plus").css("background", highlightColor);
    $(".birdseye-brush.moveable").css("fill", highlightTransparentColor);
    //Text
    $("#title").html("<p> Canvas Tour</p>");
    $("#description").html("<p> To move through the different elements on the Canvas you must click on it and drag on the direction you want \
                            you want to go to.<br><br>\
                            On the left Navigation panel you will find higlighted the <b>Birdseye</b>, it is another tool that will help you get a quick \
                            glimpse of the elements on the Canvas. If you click and drag to the direction you want to go it will also \
                            allow you to move through the different elements. The higlighted navigation buttons allow you to zoom in and zoom out, \
                            and the mouse wheel will achieve that same goal as well.</p>");
    resetFont();
    // Buttons
    defaultButtonsConfig("Next");
    $("#left-but").click(nifiGuiBox);
    $("#right-but").click(processGroupSelectBox);
};

function processGroupSelectBox(){
    // Actions on GUI
    stopClicks();
    $(".fa-search-minus").css("background", "");
    $(".fa-search-plus").css("background", "");
    $(".birdseye-brush.moveable").css("fill", "");
    $("#group-component").css("background", highlightColor);
    $("#group-component").mouseover();
    $("#left-but").css("display", "inline-flex");
    $(".modal-glass").remove();
    //Text
    $("#title").html("<p> Process Groups</p>");
    $("#description").html("<p> We have already established that the Canvas is the grid on which we are going to display other Nifi elements. \
                            The two most common elements that we are going to insert on it are Processors and Process Groups.\
                            Nifi performs its operations through Processors, they are the ones that get things done.\
                            When many processors work together towards the same \
                            purpose, it is a good practice to group them together in Process Groups. They <b>don't</b> perform any actions \
                            on the flow, they just <b>keep the Processors inside of it grouped together</b>. <br><br> \
                            On the top menu bar you will see a highlighted icon. Click on it \
                            and <b>drag</b> it to some place of the canvas before stop clicking your mouse, which will be the location where \
                            the Process Group is going to be instanciated (created). \
                            One a new panel named \"Add Process Group\" is opened click on \"Validate\".</p>");
    resetFont();
    // Buttons
    defaultButtonsConfig();
    $("#left-but").click(() => {birdsEyeBox()});
    $("#right-but").text("Validate");
    $("#right-but").click(() => {addPGVal()});
};

function Error(backBox){
    nRemainingAttempts -= 1
    // Actions on GUI
    stopClicks();
    //Text
    $("#attempts").html(`<button id="contract" style="height:25px"> <i class="fa fa-chevron-circle-down" aria-hidden="true"></i> </button> \
                        <p style="display:inline-block; position: absolute; right: 5px;">Remaining attempts: ${String(nRemainingAttempts)}</p>`);
    $("#title").html("<p> Oops, there was a mistake</p>");
    if (nRemainingAttempts > 1){$("#description").html("<p> Let's go back and try again. Read the instructions precisely, you will get it right next time!</p>");
    }
    if (nRemainingAttempts == 1){$("#description").html("<img src=\"https://images-na.ssl-images-amazon.com/images/I/A1aWyBuQQsL._SY500_.jpg\" \
                                 style=\"height:300px; margin-left: 25%;\"><p> Watch out! You have only one try left. Let's go back and try again. Read the instructions precisely, you will get it right next time!</p>")};
    if (nRemainingAttempts == 0){$("#description").html("<img src=\"https://c.tenor.com/wbAG6C4aZGgAAAAC/chuck-norris-punch.gif\" \
                                style=\"height:300px;\"><p> 3 strikes and you are out. Better luck next time!</p>");}

    // Buttons
    if (nRemainingAttempts >= 1){
        $("#left-but").css("display", "none");
        $("#right-but").text("Go Back");
        $("#right-but").click(() => { backBox();});
        $("#contract").click(function(){$("#min-exercise-box").css("display", "block"); $("#exercise-box").css("display", "none")});
        $("#expand").click(function(){$("#min-exercise-box").css("display", "none"); $("#exercise-box").css("display", "block")});
    }
    else{
        $("#left-but").css("display", "none");
        $("#right-but").text("Exit");
        $("#right-but").click(exit);
    }
};

function addPGVal(){
    stopClicks();
    if ($("#new-process-group-dialog").css("display") == 'block'){
        processGroupNameBox();
    }
    else{
        Error(processGroupSelectBox);
    }
};

function processGroupNameBox(){
    // Actions
    stopClicks();
    $("#group-component").css("background", "");
    $("#group-component").mouseleave();
    const processGroup = getProcessGroupElement("my_first_flow");
    $($(processGroup).hashId()).unhighlightMenu("Configure");
    $(processGroup).unhighlightProcessGroup();
    //Text
    $("#title").html("<p> Add a Name </p>");
    $("#description").html("<p>  Name the Process Group: <br><br>\
                            <em>my_first_flow</em>  <br><br>\
                            Please <b>respect the underscores and lower case</b> of the name. If you don't follow my instructions to the letter \
                            I won't be able to correct your exercise properly. <br><br> \
                            Click on the \"ADD\" button. <br><br> \
                            This will be the Process Group that contains all the Processors of your first flow. Process Groups can contain \
                            other elements, such as Processors, inside of it, they can evan contain another Process Group inside of it! But for now we are going to \
                            try to keep it as simple as possible and only insert Processors in it. <br><br>\
                            When you have your new Process Group instanciated on your canvas click on \"Validate\".</p>");
    resetFont();
    // Buttons
    defaultButtonsConfig();
    $("#left-but").click( () => {processGroupSelectBox()});
    $("#right-but").click( () => {processGroupNameVal()});
};

function processGroupNameVal(){
    stopClicks();
    const processGroups = $(".process-group-name");
    processGroups.each(function(i, pg){
        if ($(pg).text() == 'my_first_flowmy_first_flow'){
            processGroupRoot = $(pg).parent()
        }
    })
    if (processGroupRoot != "unfound"){
        processGroupConfigurationBox();
    }
    else{
        Error(processGroupNameBox);
    }
};

function processGroupConfigurationBox(){
    // Actions on GUI
    stopClicks();
    const processGroup = getProcessGroupElement("my_first_flow");
    $($(processGroup).hashId()).highlightMenu("Configure");
    $(processGroup).highlightProcessGroup()
    $("#process-group-comments").css("background", "");
    $("#process-group-configuration-save").css("background", "");
    $("#shell-close-button").css("background", "");
    //Text
    $("#title").html("<p> Configuration </p>");
    $("#description").html("<p> Congratulations! You have instanciated your first Process Group! <br> \
                            Make a <b>right</b> click on the box of the Process Group \"my_first_flow\" (the one that has its borders highlighted). A context menu will open. Click on \"Configure\". \
                            When the Configuration Panel of the Process Group is open  click on \"Validate\"</p>");
    resetFont();
    // Buttons
    defaultButtonsConfig();
    $("#left-but").css("display", "inline-flex");
    $("#left-but").click(processGroupNameBox);
    $("#left-but").text("Go Back");
    $("#right-but").click(configurationOpenVal);
    $("#right-but").text("Validate");
};

function configurationOpenVal(){
    stopClicks();
    if ($("#shell-dialog").css("display") == "block"){
        configurationCommentBox();
    }
    else{
        Error(processGroupConfigurationBox);
    }
};

function configurationCommentBox(){
    // Actions on GUI
    stopClicks();
    const processGroup = getProcessGroupElement("my_first_flow");
    $($(processGroup).hashId()).unhighlightMenu("Configure");
    $(processGroup).unhighlightProcessGroup();
    $("#process-group-comments").css("background", highlightColor)
    $("#process-group-configuration-save").css("background", highlightColor)
    $("#shell-close-button").css("background", highlightColor)
    $("#data-flow-title-container").css("background", "")
    //Text
    $("#title").html("<p> Comments on flows</p>");
    $("#description").html("<p> Let's add an <b>explanatory description</b> about the flow you are about to create. <br><br> \
                            Comments will allow you to keep track of your work, and adding a summary can help your \
                            better understand your work as well. Copy and paste this text in the \"Process Group Comments\" section:<br><br>\
                            <em>This flow will make a request to an API URL and store the response locally</em> <br><br>\
                            Click on \"APPLY\" and later click on \"OK\" when a \"Process Group Configuration\" alert window is displayed. \
                            Click on the cross from the top right corner of this panel to exit.\
                            Once you are back on the canvas click on \"Validate\".</p>");
    resetFont();
    // Buttons
    defaultButtonsConfig();
    $("#left-but").css("display", "inline-flex");
    $("#left-but").click(processGroupConfigurationBox);
    $("#left-but").text("Go Back");
    $("#right-but").click(commentVal);
    $("#right-but").text("Validate");
};

function commentVal(){
    stopClicks();
    const cleanIdPG = processGroupRoot.attr("id").substring(3);
    if ($("#comments-tip-" + cleanIdPG).text() == "This flow will make a request to an API URL and store the response locally") {
        goInsideProcessGroupBox();
    }
    else{
        Error(configurationCommentBox);
    };
};

function goInsideProcessGroupBox(){
    // Actions on GUI
    stopClicks();
    const processGroup = getProcessGroupElement("my_first_flow");
    $(processGroup).highlightProcessGroup();
    $("#process-group-comments").css("background", "")
    $("#process-group-configuration-save").css("background", "")
    $("#shell-close-button").css("background", "")
    $("#data-flow-title-container").css("background", highlightColor)
    //Text
    $("#title").html("<p> Accessing your Process Group </p>");
    $("#description").html("<p> Great news! Your Process Group is good to go! <br><br> \
                            When you make a double click on a Process Group you will see a new canvas displayed. On the bottom of the window, \
                            the highlighted status bar indicates the path of the Process Group you are located. Notice how it changes when you double click on the \
                            process group my_first_flow. <br><br>\
                            <b>Double</b> click on it so you can access it and start adding all of its components.\
                            Once you are inside click on \"Validate\".</p>");
    resetFont();
    // Buttons
    defaultButtonsConfig();
    $("#left-but").click(configurationCommentBox);
    $("#right-but").click(insideProcessGroupVal);
}

function insideProcessGroupVal(){
    stopClicks();
    const pathText = $("#data-flow-title-container").text();
    const pathInsideProcessGroup = '\n                    my_first_flow\n                ';
    if (pathText.includes(pathInsideProcessGroup)){
        firstProcessorBox();
    }
    else{
        Error(goInsideProcessGroupBox);
    };
};

function firstProcessorBox(){
    // Actions on GUI
    stopClicks();
    $("#data-flow-title-container").css("background", "")
    $("#processor-component").mouseout()
    $("#processor-component").css("background", "");
    //Text
    $("#title").html("<p> Processors </p>");
    $("#description").html("<p> We are all set now. Let's get down to work. <br><br> \
                                We have our Process Group instanciated, which will be composed of Processors that work \
                                together towards a common goal. But what are exactly processors? <br> \
                                They are the components of Nifi that <b>actually do the work</b> in the flow. Whatever <b>action</b> you want to perform \
                                on Nifi, you are going to do it through processors. They read data, process it, \
                                transform it, send it, receive it, etc. <br><br> \
                                There are a lot of processors, you will start learning their multiple \
                                varieties and functionalities as you go along the way, so don't let anxiety get to you! <br><br> \
                                If you want to read the definition from the official Documentation go to this \
                                <a href=\"https://nifi.apache.org/docs/nifi-docs/html/developer-guide.html#components\" target=\"_blank\">link</a>.</p>");
    resetFont();
    // Buttons
    defaultButtonsConfig();
    $("#left-but").click(goInsideProcessGroupBox);
    $("#right-but").text("Next");
    $("#right-but").click(addProcessorBox);
}

function addProcessorBox(){
    // Actions on GUI
    stopClicks();
    $("#processor-type-filter").css("background", "");
    $("#processor-component").mouseover();
    $("#processor-component").css("background", highlightColor);
    //Text
    $("#title").html("<p> Instanciating a Processor</p>");
    $("#description").html("<p> It's time to put our first processor on our Canvas! \
                            You will see on the top menu a highlighted icon, click on it and </b>drag</b> the mouse towards \
                            the top center of the Canvas, when you get to the specific place you want the Processor to be instanciated\
                            stop clicking your mouse (it doesn't have to be a specific location, just try to \
                            put it aligned on the top center). <br> \
                            When a new panel named \"Add Processor\" is opened click on \"Validate\".</p>");
    resetFont();
    // Buttons
    defaultButtonsConfig();
    $("#left-but").click(firstProcessorBox);
    $("#right-but").click(addProcessorWindowVal);
};

function addProcessorWindowVal(){
    stopClicks();
    if ($("#new-processor-dialog").is(":visible")){
        addGenerateFlowFileBox();
    }
    else{
        Error(addProcessorBox);
    }
};

function addGenerateFlowFileBox(){
    // Actions on GUI
    stopClicks();
    $("#processor-component").mouseout()
    $("#processor-component").css("background", "");
    $("#global-menu-button").css("background", "");
    $("#processor-type-filter").css("background", highlightColor)
    //Text
    $("#title").html("<p> GenerateFlowFile Processor</p>");
    $("#description").html("<p> You are seing displayed a <b>list with all of the Processors</b> that Nifi has available. <br><br> \
                             The filter search list is highlited. Click on it and type <em>\"generate\"</em> . As you start typing \
                             you will see that the list gets cropped down to the Processors that contain the word you are \
                             looking for. Click on the processor named \"GenerateFlowFile\" and then on \"ADD\". <br><br> \
                             Once the processor is instanciated on your canvas click on \"Validate\".</p>");
    resetFont();
    // Buttons
    defaultButtonsConfig();
    $("#left-but").click(addProcessorBox);
    $("#right-but").click(generateFFOnCanvasVal);
};

function generateFFOnCanvasVal(){
    stopClicks();
    var processorInCanvas = false;
    const processors = $(".processors").children();
    processors.each(function(i, processor){
        const processorText = $($(processor).find(".processor-name")).immediateText();
        if (processorText == "GenerateFlowFile"){
            processorInCanvas = true;
            generateFlowFileID = $(processor).attr("id");
            console.log(generateFlowFileID)
        };
    });
    if (processorInCanvas == true){
        generateFFDescriptionBox();
    }
    else{
        Error(addGenerateFlowFileBox);
    }
};

function generateFFDescriptionBox(){
    // Actions on GUI
    stopClicks();
    $("#processor-type-filter").css("background", "");
    $("#global-menu-button").css("background", highlightColor);
    $("#help-link").css("background", highlightColor);
    //Text
    $("#title").html("<p> Information Sources </p>");
    $("#description").html("<p> Note that this processor was instanciated locating itself on the place where you draged and drop your mouse. <br> \
                            As its name indicates, this processor will create the file that will flow through all the processors \
                            of this Integration. <br> \
                            If you want to get the <b>technical details</b> of a processor you con always go to the <b>documentation</b> \
                            and find the specifications about a processor. It is very important that you start looking for the information \
                            you need for your work on all the available sources, get used to looking for answers on the wikis, on the Internet and on \
                            the official documentation! And never be afraid of raising a hand to a member \
                            from your Cluster if you find yourself lost. <br> \
                            To open the documentation click the highlighted top right corner menu and then click on \"Help\" \
                            (if you need to minimize this box click on the icon <i class=\"fa fa-chevron-circle-down\" aria-hidden=\"true\"></i>). \
                            When the help window is opened click on \"Validate\".</p>");
    resetFont();
    // Buttons
    defaultButtonsConfig();
    $("#left-but").click(addGenerateFlowFileBox);
    $("#right-but").click(helpWindowVal);
};

function helpWindowVal(){
    stopClicks();
    if ($("#shell-dialog").css("display") == "block"){
        documentationBox();
    }
    else{
        Error(generateFFDescriptionBox);
    }
};

function documentationBox(){
    // Actions on GUI
    stopClicks();
    $("#global-menu-button").css("background", "");
    $("#help-link").css("background","");
    //Text
    $("#title").html("<p> Documentation</p>");
    $("#description").html("<p> This is the documentation of the <b>version</b> of Nifi that is used inside of Avature. <br><br> \
                            Always keep in mind that the <b>oficial software distributed by Apache is different from the one that we use \
                            internally at Avature</b>, because the Integrations Framework team has developed some <b>specific processors that \
                            were customly made for the needs of this company</b>. For example. if you look for the processor <em>\"PutImportService\"</em> \
                            on the  <a href='https://nifi.apache.org/docs.html' target='_blank'> Apache Official Documentation</a> \
                            you will not find it. \
                            But if you pres Ctrl+F on this window and look for \
                            <em>\"PutImportService\"</em> on the Avature Internal Documentation you can check yourself that it is there \
                            (I don't have the Ctrl key on my keabord because nothing controls Chuck Nifi). <br><br> \
                            Now search for the processor <em>\"GenerateFlowFile\"</em> and try to read it. Do not worry if you don't understand \
                            much of what it says, I just want you to keep in mind that this information is available.</p>");
    resetFont();
    // Buttons
    defaultButtonsConfig();
    $("#left-but").click(generateFFDescriptionBox);
    $("#right-but").click(FlowFileDefinitionBox);
    $("#right-but").text("Next");
};

function FlowFileDefinitionBox(){
    // Actions on GUI
    stopClicks();
    const generateFFElement = getProcessorElement("GenerateFlowFile");
    const generateFFElementID = $(generateFFElement).attr("id");
    $(`#${generateFFElementID} .run-status-icon`).css("background", "");
    //Text
    $("#title").html("<p> Flow File </p>");
    $("#description").html("<p> We have now the processor that generates a Flow File, but what exactly is a Flow File? \
                            Nifi names are usually self explanatory, and this is not the exception. It is the file that will \
                            go through all of the processors, carrying the data that will undergo all the operations the processors \
                            will perform on it. <br> \
                            There are many ways of creating a Flow File, which we might look into on the future, but suffer using this processor \
                            is the most simple one. <br> \
                            I have already told you the importance of looking for information on the documentation. \
                            Look for <em>\"FlowFile\"</em> to see what extra knowledge you can gather. </p>");
    resetFont();
    // Buttons
    defaultButtonsConfig();
    $("#left-but").click(documentationBox);
    $("#right-but").click(relationShipsDefinitionBox);
    $("#right-but").text("Next");
};

function relationShipsDefinitionBox(){
    // Actions on GUI
    stopClicks();
    const generateFFElement = getProcessorElement("GenerateFlowFile");
    const generateFFElementID = $(generateFFElement).attr("id");
    $(`#${generateFFElementID} .run-status-icon`).css("background", highlightColor);
    $("#processor-component").css("background", "");
    $("#processor-type-filter").css("background", "");
    //Text
    $("#title").html("<p> Relationships </p>");
    $("#description").html("<p> Close the Documentation with the Esc key \
                            (my computer doesn't have the Esc key because nothing escapes Chuck Nifi). <br><br> \
                            One processor can perform a specific operation on a Flow File. Therefore, in order to develop\
                            an Integration you must have many <b>different Processors doing all the actions</b> that you need. \
                            Depending on how the results of this operations, the Flow File will be routed to different paths. \
                            for that reason there will be different <b>Relationships between the processors</b>. <br><br> \
                            If you hover the mouse over the Atention Icon (<i class='fas fa-triangle-exclamation' style='color: #cf9f5d'></i>) \
                            on the GenerateFlowFile Processor you will see a message that says: \
                            <em>\"'Relationship success' is invalid because Relationship 'success' is not connected to any component and is not auto-terminated\"</em>. \
                            This means that Processor must have its relationships properly conected with other processor through the correct Relationship.</p>");
    resetFont();
    // Buttons
    defaultButtonsConfig("Next");
    $("#left-but").click(FlowFileDefinitionBox);
    $("#right-but").click(addInvokeHTTPtBox);
};

function addInvokeHTTPtBox(){
    // Actions on GUI
    const generateFFElement = getProcessorElement("GenerateFlowFile");
    const generateFFElementCleanID = $(generateFFElement).attr("id").substring(3);
    $(`#${generateFFElementCleanID} .run-status-icon`).css("background", "");
    $("#processor-component").css("background", highlightColor);
    $("#processor-type-filter").css("background", highlightColor);
    stopClicks();
    //Text
    $("#title").html("<p> Instanciate InvokeHTTP </p>");
    $("#description").html("<p> In order to create a relationship between two processors we must first instanciate the second one. \
                            You already know how to do it. Click and drag the icon to a location that is on the <b>same vertical axis </b> than the \
                            GenerateFlowFile processor and stop clicking your mouse when you get to the <b>bottom</b>, leaving some space in between them. \
                            Search for the processor \"InvokeHTTP\" and add it to the canvas.<br> \
                            Try to copy the display of this image:<br>\
                            <img src='https://i.ibb.co/wK7998H/order-processors-in-canvas.png' style='width:450px; margin-left: 2%;'><br>\
                            Click on \"Validate\".</p>");
    resetFont();
    // Buttons
    defaultButtonsConfig();
    $("#left-but").click(relationShipsDefinitionBox);
    $("#right-but").click(invokeHHTPOnCanvasVal);
};

function invokeHHTPOnCanvasVal(){
    stopClicks();
    var invokeHTTPElement = getProcessorElement("InvokeHTTP")
    if (invokeHTTPElement != null){
        addLogAttributeBox();
    }
    else{
        Error(addInvokeHTTPtBox);
    }
};

function addLogAttributeBox(){
    // Actions on GUI
    stopClicks();
    const generateFFElement = getProcessorElement("GenerateFlowFile");
    const invokeHTTPElement = getProcessorElement("InvokeHTTP");
    $(generateFFElement).unhighlightProcessor();
    $(invokeHTTPElement).unhighlightProcessor();
    $(generateFFElement).hover(function(){});
    //Text
    $("#title").html("<p>Instanciate LogAttribute</p>");
    $("#description").html("<p> Like water coming down from the top of a cascade, the FlowFile's movement will circulate from the top processor \
                            to the one on the bottom of the Canvas, giving the impression that is following the law of gravity \
                            (logging processors locate themselves at the right side of the central flow, but that is something we'll discuss \
                            on another ocasion).<br><br>\
                            Let's add our last processor to the canvas, instanciate the one named LogAttribute on the same vertical \
                            axis than the previous ones and on the bottom of all of them. <br><br>\
                            When you are done click on \"Validate\".</p>");
    resetFont();
    // Buttons
    defaultButtonsConfig();
    $("#left-but").click(addInvokeHTTPtBox);
    $("#right-but").click(LogAttributeOnCanvasVal);
};

function LogAttributeOnCanvasVal(){
    stopClicks();
    var logAttributeElement = getProcessorElement("LogAttribute")
    if (logAttributeElement != null ){
        relGenFFSuccessBox();
    }
    else{
        Error(addLogAttributeBox);
    }
};

function relGenFFSuccessBox(){
    // Actions on GUI
    stopClicks();
    $(".available-relationship-container").css("background", "")
    $("#processor-component").css("background", "");
    $("#processor-type-filter").css("background", "");
    const generateFFElement = getProcessorElement("GenerateFlowFile");
    const invokeHTTPElement = getProcessorElement("InvokeHTTP");
    const generateFFElementID = $(generateFFElement).attr("id");
    $(generateFFElement).highlightProcessor();
    $(generateFFElement).hover(function(){$(invokeHTTPElement).highlightProcessor();});
    $(`#${generateFFElementID} .run-status-icon`).css("background", "");
    //Text
    $("#title").html("<p> Relationships</p>");
    $("#description").html("<p> Relationships allow processors to <b>send the FlowFile to a specific path</b> depending on the <b>result of the \
                            action they performed</b>. For example, if an action on a FlowFile throws an error of any type, it is highly likely \
                            that you are going to want to handle that situation in a particular way, and route the FlowFile to a different path \
                            than the one you would have chosen if an error hadn't ocurred. <br><br> \
                            If you hover your mouse over the box of the processor GenerateFlowFile, on its center arrow will appear \
                            (<i class='fas fa-arrow-alt-circle-right' style='transform: rotate(45deg);'></i>).\
                            <b>Click on it and drag and drop</b> it at the <b>InvokeHTTP Processor</b>. <br><br> \
                            When the window to create a conection is opened click on \"Validate\".</p>");
    resetFont();
    // Buttons
    defaultButtonsConfig();
    $("#left-but").click(addLogAttributeBox);
    $("#right-but").click(createConectionWindowOpenVal);
};

function createConectionWindowOpenVal(){
    stopClicks();
    if ($("#connection-configuration").css("display") == "block"){
        genFFRelationshipBox();
    }
    else{
        Error(relGenFFSuccessBox);
    }
};

function genFFRelationshipBox(){
    // Actions on GUI
    stopClicks();
    const generateFFElement = getProcessorElement("GenerateFlowFile");
    const invokeHTTPElement = getProcessorElement("InvokeHTTP");
    $(generateFFElement).unhighlightProcessor();
    $(invokeHTTPElement).unhighlightProcessor();
    $(generateFFElement).off();
    $(".available-relationship-container").css("background", highlightColor);
    const generateFFElementID = $(generateFFElement).attr("id");
    $(`#${generateFFElementID} .run-status-icon`).css("background", highlightColor);
    $(".relationship-name.nf-checkbox-label.ellipsis:contains('Response')").css("background", "");
    //Text
    $("#title").html("<p> Create a Connection </p>");
    $("#description").html(`<p> You are seing highlighted a checkbox that is already selected for the relationships of this processor. \
                            Note that the action of the processor GenerateFlowFile can never go wrong, therefore it can only send the FlowFile through a \
                            relationship of success to the following processor. <br><br>\
                            Click on \"ADD\" and look again at the Icon of the GenerateFlowFile processor. The Warning Icon is gone, it has now a Stop Icon \
                            (<i class='fas fa-stop' style='color: #FA8072';></i>) instead, and there aren't any \
                            warnings about unestablished Relationships. <br> \
                            \"Validate\" this action.</p>`);
    resetFont();
    // Buttons
    defaultButtonsConfig();
    $("#left-but").click(relGenFFSuccessBox);
    $("#right-but").click(genFFRelSuccessVal);
};

function genFFRelSuccessVal(){
    stopClicks();
    const generateFFElement = getProcessorElement("GenerateFlowFile");
    const statusIcon = $(generateFFElement).find(".run-status-icon");
    if ($(statusIcon).attr("fill")  == "#d18686"){
        typesRelationshipsBox();
    }
    else{
        Error(genFFRelationshipBox);
    }
};

function typesRelationshipsBox(){
    // Actions on GUI
    stopClicks();
    const generateFFElement = getProcessorElement("GenerateFlowFile");
    const generateFFElementID = $(generateFFElement).attr("id");
    $(`#${generateFFElementID} .run-status-icon`).css("background", "");
    $(".available-relationship-container").css("background", "");
    $("span:contains('Response')").parent().css("background", highlightColor);
    $(".relationship-name.nf-checkbox-label.ellipsis:contains('Response')").css("background", highlightColor);
    //Text
    $("#title").html("<p> Types of Relationships </p>");
    $("#description").html("<p> Let's establish our second Relationship. Hover your mouse on the processor InvokeHTTP, click on the arrow \
                            that appears and drag and drop the mouse at the LogAttribute processor. <br><br> \
                            On the Relationships Sector of this window you will see that there are 5 possibilities. There are more options because \
                            this is a more complex processor that calls a URL, and when doing so many things can happen, like failing to connect \
                            with the server, doing so with or withour retries, etc. You can read more about this processor Relationships on the \
                            documentation. For now, we are not going to go deeper into this possible scenarios, so I just want you to select \
                            <em>\"Response\"</em> from the check checkbox. This option will bring the content of the Response \
                            of the API into the FlowFile and direct it towards then route it towards the LogAttribute Processor.<br><br>\
                            Click on \"ADD\" and then \"Validate\".</p>");
    resetFont();
    // Buttons
    defaultButtonsConfig();
    $("#left-but").click(genFFRelationshipBox);
    $("#right-but").click(typesRelationshipsVal);
};


function typesRelationshipsVal(){
    stopClicks();
    const invokeHTTPElement = getProcessorElement("InvokeHTTP");
    const invokeHTTPElementCleanID = $(invokeHTTPElement).attr("id").substring(3);
    const invokeHTTPElementStatusID = "#run-status-tip-" +  invokeHTTPElementCleanID;
    const responseRelationshipWarning =   "'Relationship Response' is invalid because Relationship 'Response' is not connected to any component and is not auto-terminated"
    if (!$(invokeHTTPElementStatusID).text().includes(responseRelationshipWarning)){
        autoTerminateRelationshipsBox();
    }
    else{
        Error(typesRelationshipsBox);
    }
};

function autoTerminateRelationshipsBox(){
    // Actions on GUI
    stopClicks();
    $(".relationship-name.nf-checkbox-label.ellipsis:contains('Response')").css("background", "");
    $(".relationship-name.nf-checkbox-label.ellipsis:contains('Failure')").css("background", "");
    $(".relationship-name.nf-checkbox-label.ellipsis:contains('No Retry')").css("background", "");
    $(".relationship-name.nf-checkbox-label.ellipsis:contains('Original')").css("background", "");
    $(".relationship-name.nf-checkbox-label.ellipsis:contains('Retry')").css("background", "");
    $("div.settings-right").find("div.fa.fa-question-circle").css("background", "");
    //Text
    $("#title").html("<p> Auto terminated Relationships</p>");
    $("#description").html("<p> If you hover your mouse over the Warning Icon (<i class='fas fa-exclamation-triangle' style='color: #cf9f5d'></i>) \
                            of the InvokeHTTP processor you will see listed five more warnigs.\
                            They are demanding that you to either select a Relationship for the 4 remaining scenarios, or Auto-terminate them (there is \
                            also a warning about the missing URL with which we will deal in a few minutes). <br><br>\
                            We have already stated that we are not interested in handling those alternative scenarios for the InvokeHTTP processor,\
                            since we only want to capture the Response. Therefore we should atomatically delete the FlowFiles that would have followed \
                            a path for those scenarios by auto terminating the scenario for that Relationship. <br><br> \
                            Right click on the InvokeHTTP processor and select \"Configure\". When the configuration panel is opened click on \"Validate\". </p>")
    resetFont();
    // Buttons
    defaultButtonsConfig();
    $("#left-but").click(typesRelationshipsBox);
    $("#right-but").click(() => processorConfigurationOpenVal(autoTerminateRelationshipsBox, terminateRelationshipsInvokeHTTPBox));
};

function processorConfigurationOpenVal(backBox, nextBox){
    stopClicks();
    if ($("#processor-configuration").css("display") == "block"){
        nextBox();
    }
    else{
        Error(backBox);
    }
};


function terminateRelationshipsInvokeHTTPBox(){
    // Actions on GUI
    stopClicks();
    $(".relationship-name.nf-checkbox-label.ellipsis:contains('Failure')").css("background", highlightColor);
    $(".relationship-name.nf-checkbox-label.ellipsis:contains('No Retry')").css("background", highlightColor);
    $(".relationship-name.nf-checkbox-label.ellipsis:contains('Original')").css("background", highlightColor);
    $(".relationship-name.nf-checkbox-label.ellipsis:contains('Retry')").css("background", highlightColor);
    $("div.settings-right").find("div.fa.fa-question-circle").css("background", highlightColor);
    //Text
    $("#title").html("<p> Auto-terminating InvokeHTTP </p>");
    $("#description").html("<p> Select the highlighted checkbox options for the auto-terminating Relationships \
                            (we have already established the Relationship Response between the processors InvokeHTTP and LogAttribute so \
                            we won't autoterminate it). By doing this we are going to prevent the FlowFile from being routed towards \
                            any of those posible scenarios by automatically deleting it.<br><br> \
                            Please take into consideration that it is not a good practice to always Auto Terminate Relationships because it makes \
                            very difficult to debug and track the errors on the flows, I am just doing this for pedagogical reasons.<br><br>\
                            Note that if you hover your mouse over the highlighted <i class=' fas fa-question-circle'></i> icon Nifi will give you a hint. <br> \
                            Click on \"APPLY\" and then \"Validate\".</p> ");
    resetFont();
    // Buttons
    defaultButtonsConfig();
    $("#left-but").click(autoTerminateRelationshipsBox);
    $("#right-but").click(autoTerminateInvokeHTTPVal);
};

function autoTerminateInvokeHTTPVal(){
    stopClicks();
    const invokeHTTPElement = getProcessorElement("InvokeHTTP");
    const invokeHTTPElementCleanID = $(invokeHTTPElement).attr("id").substring(3);
    const invokeHTTPElementStatusID = "#run-status-tip-" +  invokeHTTPElementCleanID;
    const relationshipWarningsNifiQA =   "'Remote URL' is invalid because Remote URL is required";
    const relationshipWarningsNifiLocal = "'Remote URL' validated against '' is invalid because Not a valid URL";
    if ($(invokeHTTPElementStatusID).text() ==  relationshipWarningsNifiQA || $(invokeHTTPElementStatusID).text() ==  relationshipWarningsNifiLocal){
        autoTerminateLogAttributeBox();
    }
    else{
        Error(terminateRelationshipsInvokeHTTPBox);
    }
};

function autoTerminateLogAttributeBox(){
    // Actions on GUI
    stopClicks();
    $(".relationship-name.nf-checkbox-label.ellipsis:contains('Failure')").css("background", "");
    $(".relationship-name.nf-checkbox-label.ellipsis:contains('No Retry')").css("background", "");
    $(".relationship-name.nf-checkbox-label.ellipsis:contains('Original')").css("background", "");
    $(".relationship-name.nf-checkbox-label.ellipsis:contains('Retry')").css("background", "");
    $("div.settings-right").find("div.fa.fa-question-circle").css("background", "");
    //Text
    $("#title").html("<p> Auto-terminate LogAttribute </p>");
    $("#description").html("<p> LogAttribute is a <b>dummy processor</b>. I've asked you to instanciate just so that we can \
                            later track the FlowFile after it goes through the InvokeHTTP processor. I am not going to explain\
                            you what it does and I am not interested in handling the possible Relationship scenarios because \
                            it is not going to perform any action. <br>\
                            Right click on it and select \"Configure\" from the context menu. Select \"succcess\" on the checkbox \
                            from \"Automatically Terminate Relationships\". Apply this changes \
                            and click on \"Validate\".</p>");
    resetFont();
    // Buttons
    defaultButtonsConfig();
    $("#left-but").click(terminateRelationshipsInvokeHTTPBox);
    $("#right-but").click(autoTerminateLogAttributeVal);
};

function autoTerminateLogAttributeVal(){
    stopClicks();
    const LogAttributeElement = getProcessorElement("LogAttribute");
    const LogAttributeElementCleanID = $(LogAttributeElement).attr("id").substring(3);
    const LogAttributeElementStatusID = "#run-status-tip-" +  LogAttributeElementCleanID;
    const relationshipWarnings =   "'Relationship success' is invalid because Relationship 'success' is not connected to any component and is not auto-terminated"
    if ($(LogAttributeElementStatusID).text() !=  relationshipWarnings){
        invokeHTTPUrlWarningBox();
    }
    else{
        Error(autoTerminateLogAttributeBox);
    }
};

function invokeHTTPUrlWarningBox(){
    // Actions on GUI
    stopClicks();
    $("#processor-configuration-tabs").find("li.tab:contains('Properties')").css("background", "")
    //Text
    $("#title").html("<p> InvokeHTTP </p>");
    $("#description").html("<p> All the interactions on the internet are based on the <b>Client-Server arcquitecture</b>, which basicaly implies \
                            that the Client will ask for something through a <b>\"Request\"</b> and the Server will give something back in the form \
                            of a <b>\"Response\"</b>. When we type a URL on our browser and press enter, the browser will act as the Client and send \
                            a Request to the Server of this site, which will send back a Response, which is the webpage itself that the \
                            browser renders. The internet is full on information about this topic, here is what \
                            <a href = 'en.wikipedia.org/wiki/Request–response' target='_blank'>Wikipedia<\a> \
                            has to say about it. <br><br> \
                            The InvokeHTTP processor sends a <b>Request and copies the content of the Response on the FlowFile</b>. But to do so \
                            it needs to have a URL to make the call. That is why if you hover your over the Warning Icon will see that \
                            the message says that a URL is required. \
                            Right click on the processor and select \"Configure\" from the context menu. <br><br>\
                            \"Validate\" when the configuration panel is opened.</p>");
    resetFont();                            
    // Buttons
    defaultButtonsConfig();
    $("#left-but").click(autoTerminateLogAttributeBox);
    $("#right-but").click(() => processorConfigurationOpenVal(invokeHTTPUrlWarningBox, invokeHTTPPropertiesBox));
};

function invokeHTTPPropertiesBox(){
    // Actions on GUI
    stopClicks();
    $("#processor-configuration-tabs").find("li.tab:contains('Properties')").css("background", highlightColor);
    $($("#processor-properties .grid-canvas").children()[1]).css("background", "")   
    //Text
    $("#title").html("<p> Processor Properties </p>");
    $("#description").html("<p> Click on the highlighted Properties Tab. <br><br> \
                            You are seing displayed a list with all the properties that this processor can have. \
                            The <b>actions</b> it performs will be done on a <b>specific way</b> depending on the <b>configuration \
                            of its properties</b>. <br><br> \
                            Try to make some research about the properties of this processor by going to the documentation or by hovering \
                            your mouse over the <i class=' fas fa-question-circle'></i> icon. <br><br>\
                            Click on \"Validate\" to continue. </p>");
    resetFont();
    // Buttons
    defaultButtonsConfig();
    $("#left-but").click(invokeHTTPUrlWarningBox);
    $("#right-but").click(propertiesTabSelectedVal);
};

function propertiesTabSelectedVal(){
    stopClicks();
    const propertiesTabClass  = $($("#processor-configuration-tabs .tab-pane").children()[2]).attr("class")
    if (propertiesTabClass == 'tab selected-tab'){
        insertUrlBox();
    }
    else{
        Error(invokeHTTPPropertiesBox);
    }
};

function insertUrlBox(){
    // Actions on GUI
    $("#processor-configuration-tabs").find("li.tab:contains('Properties')").css("background", "");
    $($("#processor-properties .grid-canvas").children()[1]).css("background", highlightColor);
    stopClicks();
    //Text
    $("#title").html("<p> URL API </p>");
    $("#description").html("<p> Note that the properties\
                            that are in bold are the ones that are <b>mandatory</b>, and that the processor can't run unless they are\
                            configured. The Remote URL is still not set, and that is why you were geting a Warning. We are going \
                            to fill it with a URL of an API. <br><br>\
                            APIs are the most common way nowdays to <b>send and receive information</b>. Through them we exhange \
                            in a <b>practical, simple and secure way</b>. <br><br>\
                            On this ocasion you will be working with my favourite <a href='https://api.chucknorris.io/'> API </a>, \
                            that brings back a randomly generated fun fact about my life every time you call it. Copy and paste the following \
                            URL on the highlighted property (mind not leaving any extra white space):<br><br>\
                            <em>https://api.chucknorris.io/jokes/random</em> <br><br> \
                            Apply these changes and check for yourself that there are no more Warnings on the processors. Click on \"Validate\".</p>"
                            );
    resetFont();
    // Buttons
    defaultButtonsConfig();
    $("#left-but").click(invokeHTTPPropertiesBox);
    $("#right-but").click(urlSetInvokeHTTPVal);
};

function urlSetInvokeHTTPVal(){
    stopClicks();
    const generateFlowFileElement = getProcessorElement("GenerateFlowFile");
    const statusIcon = $(generateFlowFileElement).find(".run-status-icon");
    if ($(statusIcon).attr("fill")  == "#d18686"){
        GenerateFlowFileConfigBox();
    }
    else{
        Error(insertUrlBox);
    }
};

function GenerateFlowFileConfigBox(){
    // Actions on GUI
    stopClicks();
    $($("#processor-properties .grid-canvas").children()[1]).css("background", "");
    $("#processor-configuration-tabs").find("li.tab:contains('Scheduling')").css("background", "");
    $(".fa.fa-question-circle").css("background", "");
    //Text
    $("#title").html("<p>GenerateFlowFile Configuration</p>");
    $("#description").html("<p> We're almost set! There is one last property that we need to configure in order to start\
                            this flow. Right click on the GenerateFlowFile processor and select Configuration from the context menu. <br><br>\
                            \"Validate\" this action when the Configuration panel is open.</p>");
    resetFont();
    // Buttons
    defaultButtonsConfig();
    $("#left-but").click(insertUrlBox);
    $("#right-but").click(() => processorConfigurationOpenVal(GenerateFlowFileConfigBox, schedulingBox));
};

function schedulingBox(){
    // Actions on GUI
    stopClicks();
    $("#processor-configuration-tabs").find("li.tab:contains('Scheduling')").css("background", highlightColor);
    $(".fa.fa-question-circle").css("background", highlightColor)
    $("#timer-driven-scheduling-period").css("background", "");
    //Text
    $("#title").html("<p> Scheduling </p>");
    $("#description").html("<p> Hover your mouse over the <i class=' fas fa-question-circle'></i> icons and see what you can learn. <br><br>\
                            Click on the Scheduling higlighted tab of the Configuration.<br><br>\
                            You are seing displayed a list of all the possible properties related to the <b>timing of the \
                            execution</b> of this processor.</p>");
    resetFont();
    // Buttons
    defaultButtonsConfig("Next");
    $("#left-but").click(GenerateFlowFileConfigBox);
    $("#right-but").click(schedulingTimeBox);
};

function schedulingTimeBox(){
    // Actions on GUI
    stopClicks();
    $("#processor-configuration-tabs").find("li.tab:contains('Scheduling')").css("background", "");
    $(".fa.fa-question-circle").css("background", "")
    $("#timer-driven-scheduling-period").css("background", highlightColor);
    const generateFFElement = getProcessorElement("GenerateFlowFile");
    $(generateFFElement).unhighlightMenu("Start");
    //Text
    $("#title").html("<p> Scheduling Time </p>");
    $("#description").html("<p> Right now the Run Schedule is set to 0 sec, which means that this processor which generate \
                            one FlowFile every 0 seconds. This would automatically flood Nifi of FlowFiles, because it would \
                            automatically create thousands in a very small period of time, brining lag and demanding extra resources from the memory of our \
                            server. <br><br> \
                            To prevent this, it is best that we set this property to a bigger number, like 1000 min. \
                            I will let you choose the time yourself. Apply these changes.</p>");
    resetFont();
    // Buttons
    defaultButtonsConfig("Next");
    $("#left-but").click(schedulingBox);
    $("#right-but").click(startGenerateFlowFileBox);
};

function startGenerateFlowFileBox(){
    // Actions on GUI
    stopClicks();
    $("#timer-driven-scheduling-period").css("background", "");
    const generateFFElement = getProcessorElement("GenerateFlowFile");
    $(generateFFElement).highlightMenu("Start");
    $("#canvas-container").unhighlightMenu("Refresh");
    //Text
    $("#title").html("<p> Starting a Processor </p>");
    $("#description").html("<p> Yeyyy we can finally trigger our flow! <br><br>\
                            Right now all of our processors are stopped, meaning that they are <b>not</b> performing any actions.\
                            Let's start GenerateFlowFile by right clicking it and selecting \"Start\" from the context menu. <br><br> \
                            A new FlowFile will be generated  (another one will be generated after the amount of time that you set in \
                            the Scheduling in the previous step).\
                            Click on \"Validate\".</p>");
    resetFont();
    // Buttons
    defaultButtonsConfig();
    $("#left-but").click(schedulingTimeBox);
    $("#right-but").click(startGenerateFlowFileVal);
};

function startGenerateFlowFileVal(){
    stopClicks();
    const generateFFElement = getProcessorElement("GenerateFlowFile");
    const generateFFElementId = $(generateFFElement).attr("id");
    if ($("#" + generateFFElementId + " .run-status-icon").attr("fill") == '#7dc7a0'){
        refreshBox();
    }
    else{
        Error(startGenerateFlowFileBox);
    }
};

function refreshBox(){
    // Actions on GUI
    stopClicks();
    const generateFlowFileElement = getProcessorElement("GenerateFlowFile");
    $(generateFlowFileElement).unhighlightMenu("Start");
    const generateFlowFileElementId = $(generateFlowFileElement).attr("id");
    $($("#" + generateFlowFileElementId + " .processor-canvas-details").children()[3]).attr("fill", "#ffffff");
    $($("#" + generateFlowFileElementId + " .processor-canvas-details").children()[7]).attr("fill", "#ffffff");
    $("#canvas-container").highlightMenu("Refresh");
    const connections = $(".connections").children();
    var topConnection = null;
    var topConnectionX = Infinity;
    connections.each((i, connection) => {if ($(connection).offset()['top'] < topConnectionX){topConnection = connection; topConnectionX = $(connection).offset()['top']}});
    var topConnectionId = $(topConnection).attr("id");
    $($(`#${topConnectionId} .connection-label-background`)[1]).attr("style", `fill: "#ffffff";`)
    //Text
    $("#title").html("<p> Refresh </p>");
    $("#description").html("<p> To see the changes displayed you must first right click on any place of the canvas and \
                            select the Refresh option from the context menu. If not, nifi will take a few seconds to \
                            render this changes. <br><br>\
                            Click on \"Validate\" one you have refreshed (or if you see that a new FlowFile is already queued).</p>");
    resetFont();
    // Buttons
    defaultButtonsConfig();
    $("#left-but").click(startGenerateFlowFileBox);
    $("#right-but").click(queueLoadedVal);
};

function queueLoadedVal(){
    stopClicks();
    const queuedStats = $(".stats-value.queued");
    var topStat = null;
    var topStatX = Infinity
    queuedStats.each((i, stat) => {if ($(stat).offset()['top'] < topStatX){topStat = stat; topStatX = $(stat).offset()['top']}});
    if ($(topStat).text() != '0 (0 bytes)'){
        stopInvokeHTTPBox();
    }
    else{
        Error(refreshBox);
    }
};

function stopInvokeHTTPBox(){
    // Actions on GUI
    stopClicks();
    $("#canvas-container").unhighlightMenu("Refresh");
    //Text
    $("#title").html("<p> Stopping a Processor</p>");
    $("#description").html("<p> Even though I told you to set a big number in the Scheduling property of the Processor GenerateFlowFile to prevent \
                            from generating multiple FlowFiles automatically, it is \
                            considered a <b>good practice</b> to stop this processor after you start it, just in case you forget to stop it and the \
                            FlowFiles keep \
                            on being generated. Whenever you want to create a new FlowFile you will have to start and stop this processor again,\
                            but <b>don't</b> do this now.<br><br>\
                            Right click on the InvokeHTTP Processor and select \"Stop\" from the context menu.<br><br>\
                            Click on \"Validate\".</p>");
    resetFont();
    // Buttons
    defaultButtonsConfig();
    $("#left-but").click(refreshBox);
    $("#right-but").click(invokeHTTPStoppedVal);
};

function invokeHTTPStoppedVal(){
    stopClicks();
    const invokeHTTPElement = getProcessorElement("InvokeHTTP");
    const statusIcon = $(invokeHTTPElement).find(".run-status-icon");
    if ($(statusIcon).attr("fill") == '#d18686'){
        statsBox();
    }
    else{
        Error(stopInvokeHTTPBox);
    }
};

function statsBox(){
    // Actions on GUI
    stopClicks();
    const generateFlowFileElement = getProcessorElement("GenerateFlowFile");
    const generateFlowFileElementId = $(generateFlowFileElement).attr("id");
    $($("#" + generateFlowFileElementId + " .processor-canvas-details").children()[3]).attr("fill", highlightColor);
    $($("#" + generateFlowFileElementId + " .processor-canvas-details").children()[7]).attr("fill", highlightColor);
    const connections = $(".connections").children();
    var topConnection = null;
    var topConnectionX = Infinity;
    connections.each((i, connection) => {if ($(connection).offset()['top'] < topConnectionX){topConnection = connection; topConnectionX = $(connection).offset()['top']}});
    var topConnectionId = $(topConnection).attr("id");
    $($(`#${topConnectionId} .connection-label-background`)[1]).attr("style", `fill: ${highlightColor};`);
    //Text
    $("#title").html("<p> Stats</p>");
    $("#description").html("<p> Stats are an exelent way to keep track of what's going on in our flow. They display <b>data</b> about the \
                            <b>actions that have taken place on our flow</b>. <br><br> \
                            Look at the ones I've highlighted for you. \"Out\" specifies how many FlowFiles have exited that processor. \
                            There aren't any FlowFiles that have comed into because the FlowFile was generated in this processor, \
                            therefore you will see a 0 next to \"In\". <br><br>\
                            On the Relationship box you can see how many FlowFiles are queued for entering the InvokeHTTP processor and \
                            what is the size of that load.<p>");
    resetFont();
    // Buttons
    defaultButtonsConfig("Next");
    $("#left-but").click(refreshBox);
    $("#right-but").click(sendRequestBox);
};

function sendRequestBox(){
    // Actions on GUI
    stopClicks();
    const generateFlowFileElement = getProcessorElement("GenerateFlowFile");
    const generateFlowFileElementId = $(generateFlowFileElement).attr("id");
    $($("#" + generateFlowFileElementId + " .processor-canvas-details").children()[3]).attr("fill", "#ffffff");
    $($("#" + generateFlowFileElementId + " .processor-canvas-details").children()[7]).attr("fill", "#ffffff");
    const connections = $(".connections").children();
    var topConnection = null;
    var topConnectionX = Infinity;
    connections.each((i, connection) => {if ($(connection).offset()['top'] < topConnectionX){topConnection = connection; topConnectionX = $(connection).offset()['top']}});
    var topConnectionId = $(topConnection).attr("id");
    $($(`#${topConnectionId} .connection-label-background`)[1]).attr("style", `fill: "#ffffff"`)
    var bottomConnection = null;
    var bottomConnectionX = 0;
    connections.each((i, connection) => {if ($(connection).offset()['top'] > bottomConnectionX){bottomConnection = connection; bottomConnectionX = $(connection).offset()['top']}});
    var bottomConnectionId = $(bottomConnection).attr("id");
    //$(`#${bottomConnectionId} .connection-label-background`).attr("style", `fill: #ffffff;`)
    $(".connection-label-background").attr("fill", "#f4f6f7");
    $("#list-queue-menu-item").unhighlight();
    //Text
    $("#title").html("<p> Sending a Request </p>");
    $("#description").html("<p> Our FlowFile is queued for entering into the InvokeHTTP processor. It's content is empty right now, \
                            therefore its size is of 0 bytes, but it will be <b>filled with the Response</b> from the URL of the API. <br><br> \
                            Start the processor by right clicking on in and selecting the \"Start\" option. <br><br> \
                            Click on \"Validate\".</p>");
    resetFont();
    // Buttons
    defaultButtonsConfig();
    $("#left-but").click(statsBox);
    $("#right-but").click(invokeHTTPStartedVal);
};

function invokeHTTPStartedVal(){
    stopClicks();
    const invokeHTTPElement = getProcessorElement("InvokeHTTP");
    const invokeHTTPElementId = $(invokeHTTPElement).attr("id");
    if ($("#" + invokeHTTPElementId + " .run-status-icon").attr("fill") == '#7dc7a0'){
        queuedElementsBox();
    }
    else{
        Error(sendRequestBox);
    }
};

function queuedElementsBox(){
    // Actions on GUI
    stopClicks();
    $(".slick-cell.l0.r0 .pointer.show-flowfile-details.fa.fa-info-circle").css("background", "");
    const connections = $(".connections").children();
    var bottomConnection = null;
    var bottomConnectionX = 0;
    connections.each((i, connection) => {if ($(connection).offset()['top'] > bottomConnectionX){bottomConnection = connection; bottomConnectionX = $(connection).offset()['top']}});
    var bottomConnectionId = $(bottomConnection).attr("id");
    const queuesInterval = setInterval(function() {
        if ($("#title").text() == "Elements in Queue") {
            $("#list-queue-menu-item").highlight();
            $(`#${bottomConnectionId} .connection-label-background`).attr("fill", highlightColor);
        };
        if ($("#title").text() == "Queued Elements"){
            $(".connection-label-background").attr("fill", "#f4f6f7");
            $("#list-queue-menu-item").unhighlight();
            clearInterval(queuesInterval);
        };
        }
    , 100);
    $('link[title=cdnIcons]')[0].disabled=false;
    //Text
    $("#title").html("<p>Elements in Queue</p>");
    $("#description").html("<p> If you are still not seeing the queued element, refresh the Canvas by right clicking on it and selecting \
                            \"Refresh\" from the context menu. <br><br> \
                            As you can see, its size has increased, its size is actually the JSON that was captured from the Response from the API.\
                            Before entering the InvokeHTTP processor it had 0 bytes of size, because we had initialized a FlowFile with no content.\
                            When a FlowFile exits a started processor and runs into a stopped one, it is left on queue. I had asked you to instanciate \
                            the LogAttribute as a dummy processor so that we could <b>inspect the contents of a Queue</b>. \
                            Right click on the highlighted queue box and select \"List queue\" from the context menu. \
                            When the new panel is open click on \"Validate\".</p>");
    resetFont();
    // Buttons
    defaultButtonsConfig();
    $("#left-but").click(sendRequestBox);
    $("#right-but").click(queuePanelOpenVal);
};

function queuePanelOpenVal(){
    stopClicks();
    if ($("#shell-dialog").css("display") == "block"){
        listQueuedElementsBox();
    }
    else{
        Error(queuedElementsBox);
    }
};

function listQueuedElementsBox(){
    // Actions on GUI
    stopClicks();
    $("#list-queue-menu-item").unhighlight();
    const connections = $(".connections").children();
    var bottomConnection = null;
    var bottomConnectionX = 0;
    connections.each((i, connection) => {if ($(connection).offset()['top'] > bottomConnectionX){bottomConnection = connection; bottomConnectionX = $(connection).offset()['top']}});
    var bottomConnectionId = $(bottomConnection).attr("id");
    $($(`#${bottomConnectionId} .connection-label-background`)[1]).attr("style", `fill: #ffffff;`)
    $(".slick-cell.l0.r0 .pointer.show-flowfile-details.fa.fa-info-circle").css("background", highlightColor);
    $("#content-view").css("background", "")
    $('link[title=cdnIcons]')[0].disabled=true; // This will disable the CDN of the Icons so that the VIEW and DOWNLOAD buttons are displayed nicely
    //Text
    $("#title").html("<p>Queued Elements</p>");
    $("#description").html("<p> This panel contains a list with information about the queued elements. To look at the actual \
                            queued element and check its information click on the highlighted information <i class='fa fa-info-circle'></i> element \
                            located at the first column of the table. <br><br>\
                            When the new \"FlowFile\" panel is opened click on \"Validate\".</p>");
    resetFont();
    // Buttons
    defaultButtonsConfig();
    $("#left-but").click(queuedElementsBox);
    $("#right-but").click(flowFilePanelVal);
};

function flowFilePanelVal(){
    stopClicks();
    if ($("#flowfile-details-dialog").css("display") != "none"){
        viewFlowFileContentBox();
    }
    else{
        Error(listQueuedElementsBox);
    }
};

function viewFlowFileContentBox(){
    // Actions on GUI
    stopClicks();
    $(".slick-cell.l0.r0 .pointer.show-flowfile-details.fa.fa-info-circle").css("background", "");
    $("#content-view").css("background", highlightColor)
    $('link[title=cdnIcons]')[0].disabled=true;
    $("#content-download").css("background", "")
    //Text
    $("#title").html("<p> View the Content of a Flow File</p>");
    $("#description").html("<p> The FlowFile is composed of mainly two parts, it hast attributes and a body. <b>Attributes</b> contain the <b>metadata</b> about the \
                            data that you are actually working with. You can think of them like the properties of a file. The <b>body</b> contains the \
                            <b> actual information of the file that you will operate with</b>, in this case the body of the Response from the API was inserted in the \
                            Body of the FlowFile. To look at it click on \"VIEW\", a new tab on your browser will open.\
                            </p>");
    resetFont();
    // Buttons
    defaultButtonsConfig("Next");
    $("#left-but").click(listQueuedElementsBox);
    $("#right-but").click(formattingJSONBox);
};

function formattingJSONBox(){
    // Actions on GUI
    stopClicks();
    //Text
    $("#title").html("<p> Formatting the JSON </p>");
    $("#description").html("<p> On the top left corner you are going to see a dropdown next to \"View as\". Reading in one single line JSON can get confusing. \
                            Therefore, select the <b>\"formatted\"</b> option from the list so that \
                            you can view the content of the Response displayed in a more understandable way.\
                            <img src='https://i.ibb.co/gWQ3qGs/viewAs.jpg' style='width:350px'><br> \
                            In the last field of the JSON named \"value\", you will find a fun fact about my life.\
                            Come back to this tab of your browser when you conclude the inspection.</p>");
    resetFont();
    // Buttons
    defaultButtonsConfig("Next");
    $("#left-but").click(viewFlowFileContentBox);
    $("#right-but").click(downloadFlowFileBox);
};

function downloadFlowFileBox(){
    // Actions on GUI
    stopClicks();
    $("#content-download").css("background", highlightColor);
    $('link[title=cdnIcons]')[0].disabled=true;
    $("#content-view").css("background", "")
    $("#canvas-container").unhighlightMenu("Stop");
    //Text
    $("#title").html("<p> Download the FlowFile</p>");
    $("#description").html("<p> Congratulations! This is your first flow developed in Nifi, click on \"DOWNLOAD\" so you can keep the FlowFile as a \
                             memento.</p>");
    // Buttons
    defaultButtonsConfig("Next");
    $("#left-but").click(viewFlowFileContentBox);
    $("#right-but").click(stopAllProcessorsBox);
};

function stopAllProcessorsBox(){
    // Actions on GUI
    stopClicks();
    $("#content-download").css("background", "");
    const canvasInterval = setInterval(function(){
        if ($("#title").text() == "Stopping all Processors"){
            $("#stop-menu-item").highlight();
        };
        if ($("#title").text() == "Disabling all Processors") {
            $("#stop-menu-item").unhighlight();
            clearInterval(canvasInterval);
        };
    }, 100)
    $("#canvas-container").unhighlightMenu("Disable");
    //Text
    $("#title").html("<p>Stopping all Processors</p>");
    $("#description").html("<p> Exit all the configuration panels of the Queue and go back to the Canvas.<br>\
    Bewore we finish this exercise it is important that I talk to you about some good practices you must always \
                            keep in mind while working with Nifi.<br><br>\
                            When you have finished working with your flow you must stop all Processors to prevent any unwanted \
                            actions from happening. There is a trick for stopping all the Processors at once. Right click on any \
                            place of the Canvas (<b>NOT</b> on a Processor), and select \"Stop\".<br>\
                            Click on \"Validate\".</p>");
    resetFont();
    // Buttons
    defaultButtonsConfig();
    $("#left-but").click(downloadFlowFileBox);
    $("#right-but").click(stopAllProcessorsVal);
};

function stopAllProcessorsVal(){
    stopClicks();
    const processors = $(".processors").children();
    var processorsStopped = true;
    processors.each(function(i, processor){
        const processorId = $(processor).hashId()
        if ($(`${processorId} .run-status-icon`).attr("fill") != "#d18686"){
            processorsStopped = false;
        };
    });
    if (processorsStopped == true){
        disableAllProcessorsBox();
    }else{
        Error(stopAllProcessorsBox)
    };
};

function disableAllProcessorsBox(){
    // Actions on GUI
    stopClicks();
    $("#canvas-container").unhighlightMenu("Stop");
    $("#canvas-container").highlightMenu("Disable");
    $(".connection-label-background").attr("fill", "#f4f6f7");
    $("#empty-queue-menu-item").unhighlight();
    //Text
    $("#title").html("<p>Disabling all Processors</p>");
    $("#description").html("<p> When you are using NifiQA server it is <b>highly important</b> that you always also <b>disable</b> your Processors when you \
                            finish working with your Integration. This will help the Integrations Framework team keep the server on a more managable \
                            state and not consume any memory and resources that could make it crash. If you want to learn more about the difference \
                            Between Stopped and Disabled processors go to this \
                            <a href='https://docs.cloudera.com/HDPDocuments/HDF3/HDF-3.0.0/bk_user-guide/content/enabling-disabling-a-component.html' \
                            target='_blank'>link</a>.<br><br>\
                            Right click on the Canvas and select \"Disable\".<br>\
                            Click on \"Validate\".</p>");
    resetFont();
    // Buttons
    defaultButtonsConfig();
    $("#left-but").click(stopAllProcessorsBox);
    $("#right-but").click(disableAllProcessorsVal);
};


function disableAllProcessorsVal(){
    stopClicks();
    const processors = $(".processors").children();
    var processorsStopped = true;
    processors.each(function(i, processor){
        const processorId = $(processor).hashId()
        if ($(`${processorId} .run-status-icon`).attr("fill") != "#728e9b"){
            processorsStopped = false;
        };
    });
    if (processorsStopped == true){
        emptyQueuesBox();
    }else{
        Error(disableAllProcessorsBox)
    };
};

function emptyQueuesBox(){
    // Actions on GUI
    stopClicks();
    $("#canvas-container").unhighlightMenu("Disable");
    const queuesInterval = setInterval(function() {
        if ($("#title").text() == "Emptying the Queue") {
            $("#empty-queue-menu-item").highlight();
            $(".connection-label-background").attr("fill", highlightColor);
        }
        if ($("#title").text() == ' Poll '){
            $(".connection-label-background").attr("fill", "#f4f6f7");
            $("#empty-queue-menu-item").unhighlight();
            console.log("interval cleared");
            clearInterval(queuesInterval);
        }
        }
    , 100); 
    //Text
    $("#title").html("<p>Emptying the Queue</p>");
    $("#description").html("<p> It is also important that you <b>empty the queues with any existing FlowFiles</b> so that they don't get mixed \
                            up with any new FlowFiles you might create on the future, and to save memory. You can't empty all the queues at once, \
                            you have to go through every Relationship Box one by one to do so.\
                            When you are done click on \"Validate\".</p>");
    resetFont();
    // Buttons
    defaultButtonsConfig();
    $("#left-but").click(disableAllProcessorsBox);
    $("#right-but").click(emptyQueuesVal);
};

function emptyQueuesVal(){
    stopClicks();
    const connections = $(".connections").children();
    var queuesEmpty = true;
    connections.each(function(i, connection){
        const connectionId = $(connection).hashId()
        if ($(`${connectionId} .count`).text() != "0"){
            queuesEmpty = false;
        };
    });
    if (queuesEmpty == true){
        pollBox();
    }else{
        Error(emptyQueuesBox);
    };
};

function pollBox(){
    // Actions on GUI
    stopClicks();
    $(".connection-label-background").css("fill", "");
    $("#empty-queue-menu-item").unhighlight();
    //Text
    $("#title").html("<p> Poll </p>");
    $("#description").html("<p> You have done an amazing job, congratulations! You have been able to construct your first flow on Nifi, now \
                            you have the basic knowledge that will allow you to start working with Integrations on this App.<br><br>\
                            Before you go, I'd really appreciate if you could answer a very small poll so that I can properly evaluate the impact \
                            of this exercise. It will only take a few minutes (you only have to answer the questions if this is your first time doing \
                            this exercise).<br>\
                            Here is the <a href='https://forms.gle/vzUN3tLfqVBqxCgX9' target='_blank'>link</a>.</p>");
    resetFont();
    // Buttons
    defaultButtonsConfig("Next");
    $("#left-but").hide();
    $("#right-but").click(finishBox);
};

function finishBox(){
    // Actions on GUI
    stopClicks();
    //Text
    $("#title").html("<p> Exercise Completed </p>");
    $("#description").html("<img src='https://i.ibb.co/bRQ3zTF/chuck-norris-thumbs-up.gif' style='width:470px;'>");
    // Buttons
    defaultButtonsConfig("Exit");
    $("#left-but").hide();
    $("#right-but").click(exit);
};
