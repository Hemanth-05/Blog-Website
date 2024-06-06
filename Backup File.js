var count = 4;                                      //For Dynamically creating elements
var postNumber = 3;                                 //For Dynamically creating posts
var responseData = new Object();
var idOfTheDivChosenToEdit;                         //For getting the ID of the element selected



$("#postForm").submit(function(event) {
    event.preventDefault(); // Prevent default form submission
    var formData = $(this).serialize(); // Serialize form data
    $.post("/submit", formData, function(data) {

        //Resetting the form
        $(".postingTitle").val("");                         
        $(".postingDescription").val("");
        $(".postingName").val("");
        
        postNumber++;
        responseData[postNumber] = data;
        responseData[postNumber].id = "00" + postNumber;
        
        //Dynamically Creating a blog div
        var blogDiv = $("<div>");
        var newClassOfBlogDiv = "blog" + count;
        blogDiv.addClass("blog " + newClassOfBlogDiv);


        //Dynamically adding the title
        var blogTitleHeading = document.createElement("h4");
        blogTitleHeading.classList.add("blogTitle");
        blogTitleHeading.textContent = responseData[postNumber].title;

        //Dynamically adding the description
        var mainPara = document.createElement("p");
        mainPara.classList.add("blogDescription");
        mainPara.textContent = responseData[postNumber].description;

        //Dynamically adding the name of the Writer
        var byWhoPara = document.createElement("p");
        byWhoPara.classList.add("byWho");
        if(responseData[postNumber].writerName){
            byWhoPara.textContent = "- " + responseData[postNumber].writerName;
        }
        else{
            byWhoPara.textContent = "- Anonymous";
        }

        //Dynamically creating the edit and delete buttons
        var editButton = document.createElement("button");
        var deleteButton = document.createElement("button");
        editButton.classList.add(count, "edit");               // adding classname
        editButton.id = "edit" + count;                         // adding id
        editButton.textContent = "Edit";                        //Giving the value
        deleteButton.classList.add(count, "delete");           // adding classname
        deleteButton.id = "delete" + count;                     // adding id
        deleteButton.textContent = "Delete";                    //Giving the value

        //Dynamically creating the date 
        var datePara = document.createElement("p");
        datePara.classList.add("date");
        // Creating date
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var currentMonth = monthNames[month];
        var currentDate = day + " " + currentMonth + " " + year;
        datePara.textContent = currentDate;

        //Dynamically adding all the created html elements to the website
        $(".postingContent").prepend(blogDiv);
        blogDiv.hide();
        blogDiv.slideDown();
        $("." + newClassOfBlogDiv).append(datePara);
        $("." + newClassOfBlogDiv).append(blogTitleHeading);
        $("." + newClassOfBlogDiv).append(mainPara);
        $("." + newClassOfBlogDiv).append(byWhoPara);
        $("." + newClassOfBlogDiv).append(editButton);
        $("." + newClassOfBlogDiv).append(deleteButton);
        count++;
    });
});

$('.postingContent').on('click', '.edit', function() {  // Wrote this instead of the usual $(".edit").click(function(){}) because here we are dynamically creating buttons and this is how we should be adding event listeners to dynamically created elements. We are adding it through parent element. This is called "EVENT DELEGATING".
    
    // Getting the ID of the blog that is been clicked 
    idOfTheDivChosenToEdit = getID(this);

    //Loading the content of the clicked blog into the text areas
    var titleContent = $(".blog" + idOfTheDivChosenToEdit + " .blogTitle").text();
    var descriptionContent = $(".blog" + idOfTheDivChosenToEdit + " .blogDescription").text();
    var writerNameContent = $(".blog" + idOfTheDivChosenToEdit + " .byWho").text();
    console.log(titleContent);
    console.log(descriptionContent);
    console.log(writerNameContent);
    
    //Hiding the post button and filling the text area with content
    $(".onlyPost").hide();
    $(".postingTitle").val(titleContent);
    $(".postingDescription").val(descriptionContent);
    $(".postingName").val(writerNameContent);

    //Creating new button to upload
    var updateButton = document.createElement("button");
    updateButton.classList.add("onlyUpdate");
    updateButton.textContent = "Update";

    //Dynamically adding the new button to the page
    $(".writingContent").append(updateButton);
})

$('.writingContent').on('click', '.onlyUpdate', function() {
    responseData[idOfTheDivChosenToEdit].title = $(".postingTitle").val()
    responseData[idOfTheDivChosenToEdit].description = $(".postingDescription").val()
    responseData[idOfTheDivChosenToEdit].writerName = $(".postingName").val()
    var updatedData = responseData[idOfTheDivChosenToEdit];
    $(".blog" + idOfTheDivChosenToEdit + " .blogTitle").text(updatedData.title);
    $(".blog" + idOfTheDivChosenToEdit + " .blogDescription").text(updatedData.description);
    $(".blog" + idOfTheDivChosenToEdit + " .byWho").text(updatedData.writerName);

    //Hiding the Update button and Showing the Post button
    $(".onlyUpdate").hide();
    $(".onlyPost").show();

     //Resetting the form
     $(".postingTitle").val("");                         
     $(".postingDescription").val("");
     $(".postingName").val("");
 })

$('.postingContent').on('click', '.delete', function() { 
    
    alert("U sure");
    idToRemove = getID(this);
    delete responseData[idToRemove];

    $(".blog" + idToRemove).slideUp();

 })


// Function to know the which element is clicked and gather its unique ID
function getID(currentElement) {
    var classOfTheClickedButton = $(currentElement).attr('class');
    var idOfTheClickedButton = classOfTheClickedButton.split(" ")[0];
    return idOfTheClickedButton;
}