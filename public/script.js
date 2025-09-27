                 // COLLAPSE LATER TO TWO FUNCTIONS THAT RECEIVE AN ARRAY OR OBJECT
        //hides an element by setting the display to none
        function hide(toHide){
            document.getElementById(toHide).style.display = "none";
        }

        //show an element by setting a display
        function show(toShow, display){
            document.getElementById(toShow).style.display = display;
        }

        //hides two elements setting their display to none
        function hideTwo(toHide1, toHide2){
            document.getElementById(toHide1).style.display = "none";
            document.getElementById(toHide2).style.display = "none";
        }

        //shows two elements by setting a display
        function showTwo(toShow1, display1, toShow2, display2){
            document.getElementById(toShow1).style.display = display1;
            document.getElementById(toShow2).style.display = display2;
        }

        //makes the edit button animation and logic works
        function EditSwitch(textId, inputId, buttonId, editSVGId, cancelSVGId){
            let text = document.getElementById(textId);
            let input = document.getElementById(inputId);
            let button = document.getElementById(buttonId);
            let editSVG = document.getElementById(editSVGId);
            let cancelSVG = document.getElementById(cancelSVGId);

            //disables the button until the animations are finished for the animations dont glitch
            button.disabled = true;

            //set animations
            if(text.style.animationName == "hideAnimation"){
                input.style.animation = "hideAnimation .4s both";
                text.style.animation = "showAnimation .8s both ease-in";
                button.style.animation = "buttonToEditAnimation .4s both ease-in";
                editSVG.style.animation = "buttonSVGShow .4s .4s both";
                cancelSVG.style.animation = "buttonSVGHide .4s both";

                setTimeout(()=>{
                    button.disabled = false;
                    clearInput(inputId);

                    //makes the animations instant so it wont reproduce when the edit window is opened again
                    input.style.animation = "hideAnimation 0s both";
                    text.style.animation = "showAnimation 0s both";
                    button.style.animation = "buttonToEditAnimation 0s both";
                    editSVG.style.animation = "buttonSVGShow 0s both";
                    cancelSVG.style.animation = "buttonSVGHide 0s both";

                },800)   
            }
            else{
                //set animations
                text.style.animation = "hideAnimation .4s both ease-out";
                input.style.animation = "showAnimation .8s both";
                button.style.animation = "buttonToCancelAnimation .4s both ease-in";
                editSVG.style.animation = "buttonSVGHide .4s both";
                cancelSVG.style.animation = "buttonSVGShow .4s .4s both";

                //focus timeout so it can focus only when the input is visible
                setTimeout(()=>{
                    input.focus();
                }, 450)
                
                setTimeout(()=>{
                    button.disabled = false;

                    //makes the animations instant so it wont reproduce when the edit window is opened again
                    text.style.animation = "hideAnimation 0s both";
                    input.style.animation = "showAnimation 0s both";
                    button.style.animation = "buttonToCancelAnimation 0s both";
                    editSVG.style.animation = "buttonSVGHide 0s both";
                    cancelSVG.style.animation = "buttonSVGShow 0s both";

                }, 800)
            }
        }

        //clears the input
        function clearInput(inputId){
            document.getElementById(inputId).value = "";
        }  

        //works on the cancel button click, it presses all the edit buttons that are active
        function adminCancelEdit(parentId, buttonClass){
            let children = {};
            children = document.getElementById(parentId).getElementsByClassName(buttonClass);

            for(let i = 0; i < children.length; i++){
                if(children[i].style.animationName == "buttonToCancelAnimation"){
                    //little fancy delay between items
                    setTimeout(()=>{
                        children[i].click();
                    }, 75*i)
                }
            }
        }   

        //check if any edit button is active, so it can show or hide the edit footer
        function checkEditButton(parentId, buttonClass, footerId){
            let anyButtonActive = false;
            let footer = document.getElementById(footerId);
            let children = {};
            children = document.getElementById(parentId).getElementsByClassName(buttonClass);
            
            for(i=0; i < children.length; i++){
                if(children[i].style.animationName == "buttonToCancelAnimation"){
                    anyButtonActive = true;
                }
            }

            if(anyButtonActive){
                footer.style.animation = "showEditFooterAnimation .2s .2s both";
                setTimeout(()=>{
                    footer.style.animation = "showEditFooterAnimation 0s both";
                }, 350)
            }
            else{
                footer.style.animation = "hideEditFooterAnimation ease .2s both";
                setTimeout(()=>{
                    footer.style.animation = "hideEditFooterAnimation 0s both";
                }, 150)
            }
        }
