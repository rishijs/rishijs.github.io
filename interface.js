import {world,cameraMode,landnum,loading,lowres, renderer, renderError} from "./app.js";
import {crystalsCollected} from "./crystals.js";

export var hideUI = true;
export var tutorial = true;

export var setworld0 = true;
export var setworld1 = true;
export var setworld2 = true;
export var setworld3 = true;

export var setPos0 = false;
export var setPos1 = false;
export var setPos2 = false;
export var setPos3 = false;

export var worldsTraversed = 0;

export function resetTempWorlds(){
    if( setworld0 == false
        && setworld1 == false
        && setworld2 == false
        && setworld3 == false
        && world == 0){
        setworld0 = true;
        setworld1 = true;
        setworld2 = true;
        setworld3 = true;
    }
}

export function skipTutorial(){
    tutorial = false;
}

export function updateUI(){
    
    if(tutorial == true){
        document.getElementById("helpers").style.display = 'block';
        document.getElementById("loading").style.display = 'block';
        document.getElementById("indices").style.display = 'block';
        document.getElementById("skipper").style.display = 'block';
        document.getElementById("count").style.display = 'block';
        tutorial = false;
    }
    else if(tutorial == false){
        document.getElementById("helpers").style.display = 'none';
        document.getElementById("indices").style.display = 'none';
        document.getElementById("skipper").style.display = 'none';
        document.getElementById("count").style.display = 'none';
        hideUI = false;
    }

    if(lowres == true || renderError == true){
        if(renderError == true){
            document.getElementById("incompatible").style.display = 'block';
            tutorial = true;
        }
        else if(lowres == true){
            document.getElementById("overlayID").style.display = 'block';
            setTimeout(function() {
                setTimeout(function() {
                    if(lowres == true){
                        window.location.href = "/About/index.html";
                    }
                },1000);
            }, 3000);
        }

        document.getElementById("intro").style.display = 'none';
        document.getElementById("mutedText").style.display = 'none';
        document.getElementById("activeSong").style.display = 'none';
        document.getElementById("mapM").style.display = 'none';
        document.getElementById("mapL").style.display = 'none';
        document.getElementById("rightText").style.display = 'none';
        document.getElementById("ms").style.display = 'none';
        document.getElementById("loading").style.display = 'none';
        document.getElementById("infob1").style.display = 'none';
        document.getElementById("infop1").style.display = 'none';
        document.getElementById("infob2").style.display = 'none';
        document.getElementById("infop2").style.display = 'none';
        document.getElementById("infob3").style.display = 'none';
        document.getElementById("infop3").style.display = 'none';
    }
    else if(loading==false && lowres==false && renderError == false && tutorial == false){
        if(hideUI == false){
            document.getElementById("intro").style.display = 'block';
            document.getElementById("mutedText").style.display = 'block';
            document.getElementById("mapM").style.display = 'block';
            document.getElementById("mapL").style.display = 'block';
            document.getElementById("rightText").style.display = 'inline-block';
            document.getElementById("ms").style.display = 'inline-block';
            document.getElementById("loading").style.display = 'none';
            document.getElementById("infob1").style.display = 'block';
            document.getElementById("infob2").style.display = 'block';
            document.getElementById("infob3").style.display = 'block';
            document.getElementById("overlayID").style.display = 'none';
            document.getElementById("incompatible").style.display = 'none';
        }

        switch (crystalsCollected){
            case 0:
                document.getElementById("rightText").textContent = '';
                break;
            case 1:
                document.getElementById("rightText").textContent = '*';
                break;
            case 2:
                document.getElementById("rightText").textContent = '**';
                break;
            case 3:
                document.getElementById("rightText").textContent = '***';
                break;
            case 4:
                document.getElementById("rightText").textContent = '****';
                break;
            case 5:  
                document.getElementById("rightText").textContent = '*****';
                break;
            case 6:
                document.getElementById("rightText").textContent = '******';
                break;
            case 7:
                document.getElementById("rightText").textContent = '*******';
                break;
            case 8:
                document.getElementById("rightText").textContent = '********';
                break;
            case 9:
                document.getElementById("rightText").textContent = '*********';
                break;
            case 10:
                document.getElementById("rightText").textContent = '**********';
                break;
        }

        if(cameraMode == 1 && landnum != 0){
            document.getElementById("infob1").style.display = 'block';
            document.getElementById("infob2").style.display = 'block';
            document.getElementById("infob3").style.display = 'block';
            switch(world) {
                case 0:
                    //Main, Classes, Contact Info, Summary
                    switch(landnum){
                        case 1:
                            document.getElementById("infob1").textContent = "Majoring in B.S. Computer Science [More]";
                            document.getElementById("infob2").textContent = "Rutgers New Brunswick [More]";
                            document.getElementById("infob3").textContent = "3 Words That Describe My Skills [More]";
                            document.getElementById("infop1").textContent = " Planned Graduation by January 2024 - I have passed all the core classes required for the CS Major."
                            +" Currently taking other high level CS courses including Artificial Intellgience, Numerical Analysis, and Databases.";
                            document.getElementById("infop2").textContent = "I have earned 90+ credits | 3x Deans List | here in 2.5yrs worth of undergraduate study.";
                            document.getElementById("infop3").textContent = "Versatile - Creative - Adaptive";
                            break;
                        case 2:
                            document.getElementById("infob1").textContent = "Computer Science Coursework [More]";
                            document.getElementById("infob2").textContent = "Mathematics Coursework [More]";
                            document.getElementById("infob3").textContent = "Miscellaneous Courswork [More]";
                            document.getElementById("infop1").textContent = "Data Structures • Introduction to Artificial Intelligence •"
                            +" Computer Architecture • Systems Programming • Design and Analysis of Computer Algorithms";
                            document.getElementById("infop2").textContent = "Calculus I • Calculus II • Introduction to Linear Algebra • Discrete I • Discrete II"+
                            +" • Numerical Analysis • General Physics 1 • General Physics 2";
                            document.getElementById("infop3").textContent = "Digital Audio Workstations • Music Theory • Graphic Design • General Psychology";
                            break;
                        case 3:
                            document.getElementById("infob1").textContent = "Email [More]";
                            document.getElementById("infob2").textContent = "Phone Number [More]";
                            document.getElementById("infob3").textContent = "Residence [More]";
                            document.getElementById("infop1").textContent = "rishi.ign1tion@gmail.com";
                            document.getElementById("infop2").textContent = "908-342-8717";
                            document.getElementById("infop3").textContent = "New Jersey (Willing to Relocate)";
                            break;
                        case 4:
                            document.getElementById("infob1").textContent = "Plans for the Future [More]";
                            document.getElementById("infob2").textContent = "Working on Now [More]";
                            document.getElementById("infob3").textContent = "Work Location [More]";
                            document.getElementById("infop1").textContent = "My next biggest goal is to gain experience in the industry to make"+
                            " a positive impact on the world, mostly through design, games, and software.";
                            document.getElementById("infop2").textContent = "I am currently working on a rogue-like RPG in Unreal Engine called Honorbound"
                            +" while also exploring the latest developments in AI technology while also working towards graduation.";
                            document.getElementById("infop3").textContent = "I currently live in New Jersey, but I am delighted to relocate if the opportunity presents itself.";
                            break;
                    }
                    break;
                case 1:
                    //Experience, Personal Projects Pt.1, Proficient Languages, Areas of Expertise
                    switch(landnum){
                        case 1:
                            document.getElementById("infob1").textContent = "Volunteering [More]";
                            document.getElementById("infob2").textContent = "Leadership [More]";
                            document.getElementById("infob3").textContent = "Hackathons [More]";
                            document.getElementById("infop1").textContent = "I have volunteered for 160+ hours at places including the local public library.";
                            document.getElementById("infop2").textContent = "I tutored students in Math and Computer Science (mostly 1 on 1).";
                            document.getElementById("infop3").textContent = "I have attended 5+ Hackathons and refined my skills as a developer.";
                            break;
                        case 2:
                            document.getElementById("infob1").textContent = "Fire Navigator [More]";
                            document.getElementById("infob2").textContent = "Console Spot [More]";
                            document.getElementById("infob3").textContent = "JSON Parse [More]";
                            document.getElementById("infop1").textContent = "July 2022 - Creating AI Agents that navigate through a blocked maze in"
                            +" Python - Used Jupyter Notebooks - Set up meetings daily to keep up to date on project development.";
                            document.getElementById("infop2").textContent = "May 2022 - Database Project, Uses SQL, JDBC - Sell (artificial) consoles using"
                            +" SQL fundamentals, HTML, and minimalistic CSS design";
                            document.getElementById("infop3").textContent = "March 2019 - Independently made - Custom Website - Website Parses JSON Data - Uses"
                            +" Chart.js library";
                            break;
                        case 3:
                            document.getElementById("infob1").textContent = "Known Languages [More]";
                            document.getElementById("infob2").textContent = "Frameworks Used [More]";
                            document.getElementById("infob3").textContent = "Tools and Technology Used [More]";
                            document.getElementById("infop1").textContent = "C • C# • C++ • Python • Blueprint/Scripts • Java • HTML • JSON • JS • OCAML • JDBC • MySQL • LaTeX • JavaScript";
                            document.getElementById("infop2").textContent = "Three.js • Etc.";
                            document.getElementById("infop3").textContent = "Unreal Engine, Unity, Blender, PhotoShop, FlStudio, VSCode, Etc.";
                            break;
                        case 4:
                            document.getElementById("infob1").textContent = "What I Am Best At [More]";
                            document.getElementById("infob2").textContent = "Computer Science Expertise [More]";
                            document.getElementById("infob3").textContent = "Creative Expertise [More]";
                            document.getElementById("infop1").textContent = "I am extremely passionate and dedicated to whatever interests me, I am also a quick learner and have a versatile knowledge base.";
                            document.getElementById("infop2").textContent = "I have learned multiple programming languages and have done several personal projects to back them up.";
                            document.getElementById("infop3").textContent = "I have experience with emerging tools and have worked on 3 Games, this website included.";
                            break;
                    }
                    break;
                case 2:
                    //Game Dev, Fluxblade, Honorbound, About This Website
                    switch(landnum){
                        case 1:
                            document.getElementById("infob1").textContent = "Fluxblade [More]";
                            document.getElementById("infob2").textContent = "Honorbound [More]";
                            document.getElementById("infob3").textContent = "RJSD Showcase [More]";
                            document.getElementById("infop1").textContent = "I started working on this game after high school. I wanted to learn Unreal Engine, and I made this game first."
                            +" I recently released a sandbox variant of this game on itch.io, check out the Fluxblade tab for info about the game.";
                            document.getElementById("infop2").textContent = "This is the game I am working on right now. This game is in the new Unreal Engine 5 and it has a lot of data."
                            +" I had to figure out how to properly utilize data structures to allow easy additions and management to abilities, influences, and player stats. I uploaded the latest demo" 
                            +" on itch.io, check out the Honorbound tab for info about the game.";
                            document.getElementById("infop3").textContent = "I always have had multiple projects that I never really knew how to weave into one.";
                            break;
                        case 2:
                            document.getElementById("infob1").textContent = "First Unreal Engine Game [More]";
                            document.getElementById("infob2").textContent = "Main Concept [More]";
                            document.getElementById("infob3").textContent = "Game Post Release Analysis [More]";
                            document.getElementById("infop1").textContent = "This game was made in Unreal Engine 4. I used youtube tutorials to make an attempt at unlocking my vision through game development.";
                            document.getElementById("infop2").textContent = "This is an FPS survival rpg game, the player has 5 different weapons, each a different color, the goal is to chain the weapons'"
                            +" projectiles (flux). The flux is chained through nodes that the player can place around the map, these nodes are bipartite (graph theory), and the flux tracks and eliminates the enemies."
                            document.getElementById("infop3").textContent = "I was not able to create a complete game, and I often prioritized the wrong element to focus on. This game was a fundamental stepping stone" 
                            +" to understanding game design, and I now plan my projects in a very organized manner. I have, 25+, 5+ min videos that cover my progress on this game.";
                            break;
                        case 3:
                            document.getElementById("infob1").textContent = "Fixing the Game Design Approach [More]";
                            document.getElementById("infob2").textContent = "Using Several Data Structures [More]";
                            document.getElementById("infob3").textContent = "About this game [More]";
                            document.getElementById("infop1").textContent = "I now comment most if not all my code, and plan on a tool called Obsidian, to figure out what is best to prioritize.";
                            document.getElementById("infop2").textContent = "I use Data Tables, controlled by a struct, to create a map of objects like player stats or abilities. I use enums to access the"
                            +" specific element I want to get or set. I was pretty satisfied at how I chose to solve the game's data storage problem. Check the Honorbound tab for more details.";
                            document.getElementById("infop3").textContent = "I am currently working on this game, and I have released multiple, small, showcase videos and a demo.";
                            break;
                        case 4:
                            document.getElementById("infob1").textContent = "2 Week Project [More]";
                            document.getElementById("infob2").textContent = "Learning Three.js and Javascript [More]";
                            document.getElementById("infob3").textContent = "Merging Work Into 1 Website [More]";
                            document.getElementById("infop1").textContent = "It tooks 2 weeks of problem solving and learning three.js + javascript to make my first javascript project while also trying to manage my coursework.";
                            document.getElementById("infop2").textContent = "Three.js is a very interesting library to work with, and javascript was easier to get into because of my familiarity with other programming languages.";
                            document.getElementById("infop3").textContent = "Although Three.js is very powerful, I had to manually place and update everything with vectors. Standalone engines have a lot more ease of use, "
                            +" but this one has a lot of flexibility and accessibility.";
                            break;
                    }
                    break;
                case 3:
                    //Goals, Graphic Design, Sound Design, Technology
                    switch(landnum){
                        case 1:
                            document.getElementById("infob1").textContent = "4 Main Aspirations [More]";
                            document.getElementById("infob2").textContent = "Merging Passion and Work [More]";
                            document.getElementById("infob3").textContent = "Continued Exploration and Learning [More]";
                            document.getElementById("infop1").textContent = "Design Games, Music, and Software that resonate with people | Share my vision with others | Expand and Challenge my knowledgebase consistently" 
                            +" | Properly combine what excites me with what I work on";
                            document.getElementById("infop2").textContent = "I hope that, by getting into the design | development industry, I can share my vision with others.";
                            document.getElementById("infop3").textContent = "I will continue to learn and have fun doing the work that interests me.";
                            break;
                        case 2:
                            document.getElementById("infob1").textContent = "Graphic Design Course [More]";
                            document.getElementById("infob2").textContent = "3D Design Workflow [More]";
                            document.getElementById("infob3").textContent = "Miscellaneous Design [More]";
                            document.getElementById("infop1").textContent = "I am currently taking a course at Rutgers in graphic design, learning how to unlock the potential power of new design tools.";
                            document.getElementById("infop2").textContent = "I use blender for 3D models. I found the base models online and personalized them to my preference.";
                            document.getElementById("infop3").textContent = "Graphic Design helps me maximize the power of workflows I am not familiar with.";
                            break;
                        case 3:
                            document.getElementById("infob1").textContent = "Music Production Experience [More]";
                            document.getElementById("infob2").textContent = "Game Music [More]";
                            document.getElementById("infob3").textContent = "Music Courses [More]";
                            document.getElementById("infop1").textContent = "Started making music in the middle of High School and created 30+ pieces of music, gradually improving.";
                            document.getElementById("infop2").textContent = "Made music for Fluxblade and Honorbound. Still figuring out how to improve game feel with sound.";
                            document.getElementById("infop3").textContent = "I have taken multiple music courses at Rutgers to reinforce my understanding of music.";
                            break;
                        case 4:
                            document.getElementById("infob1").textContent = "Keeping Up With Trends [More]";
                            document.getElementById("infob2").textContent = "The Power of AI [More]";
                            document.getElementById("infob3").textContent = "Stay Tuned [More]";
                            document.getElementById("infop1").textContent = "The industry is always evolving, and I am always ready to utilize new tools.";
                            document.getElementById("infop2").textContent = "In my belief, AI is very powerful and it will be essential to adapt to its power, so I spend a decent amount of time exploring AI technology.";
                            document.getElementById("infop3").textContent = "I will continue to update this showcase website. Thank you for visiting.";
                            break;
                    }
                    break;
            }
        }
        else if(cameraMode == 0 || landnum == 0){
            document.getElementById("infob1").style.display = 'none';
            document.getElementById("infob2").style.display = 'none';
            document.getElementById("infob3").style.display = 'none';
        }
    }
}

export function updateWorldMap(){
    switch(world) {
        case 0:
            if(setworld0){
                setworld0 = false;
                setPos0 = true;
                document.getElementById("intro").textContent="Summary and Contact Info";
                document.getElementById("m1").style.display = 'none';
                document.getElementById("m2").style.display = 'block';
                document.getElementById("m3").style.display = 'block';
                document.getElementById("m4").style.display = 'block';
                document.getElementById("c1").style.display = 'block';
                document.getElementById("c2").style.display = 'none';
                document.getElementById("c3").style.display = 'none';
                document.getElementById("c4").style.display = 'none';

                document.getElementById("lm1").textContent = 'Origin | Start';
                document.getElementById("lm2").textContent = 'Main | First Middle';
                document.getElementById("lm3").textContent = 'Classes | Right';
                document.getElementById("lm4").textContent = 'Contact Info | Left';
                document.getElementById("lm5").textContent = 'Summary | Last Middle';
                document.getElementById("lc1").textContent = 'Origin | Start';
                document.getElementById("lc2").textContent = 'Main | First Middle';
                document.getElementById("lc3").textContent = 'Classes | Right';
                document.getElementById("lc4").textContent = 'Contact Info | Left';
                document.getElementById("lc5").textContent = 'Summary | Last Middle';

                worldsTraversed++;
            }
            break;
        case 1:
            if(setworld1){
                setworld1 = false;
                setPos1 = true;
                document.getElementById("intro").textContent="Areas of Expertise and Experience";
                document.getElementById("m1").style.display = 'block';
                document.getElementById("m2").style.display = 'none';
                document.getElementById("m3").style.display = 'block';
                document.getElementById("m4").style.display = 'block';
                document.getElementById("c1").style.display = 'none';
                document.getElementById("c2").style.display = 'block';
                document.getElementById("c3").style.display = 'none';
                document.getElementById("c4").style.display = 'none';

                document.getElementById("lm1").textContent = 'Origin | Start';
                document.getElementById("lm2").textContent = 'Experience | First Middle';
                document.getElementById("lm3").textContent = 'Personal Projects Pt.1 | Right';
                document.getElementById("lm4").textContent = 'Proficient Languages | Left';
                document.getElementById("lm5").textContent = 'Areas of Expertise | Last Middle';
                document.getElementById("lc1").textContent = 'Origin | Start';
                document.getElementById("lc2").textContent = 'Experience | First Middle';
                document.getElementById("lc3").textContent = 'Personal Projects Pt.1 | Right';
                document.getElementById("lc4").textContent = 'Proficient Languages | Left';
                document.getElementById("lc5").textContent = 'Areas of Expertise | Last Middle';

                worldsTraversed++;
            }
            break;
        case 2:
            if(setworld2){
                setworld2 = false;
                setPos2 = true;
                document.getElementById("intro").textContent="Game Development and Personal Projects";
                document.getElementById("m1").style.display = 'block';
                document.getElementById("m2").style.display = 'block';
                document.getElementById("m3").style.display = 'none';
                document.getElementById("m4").style.display = 'block';
                document.getElementById("c1").style.display = 'none';
                document.getElementById("c2").style.display = 'none';
                document.getElementById("c3").style.display = 'block';
                document.getElementById("c4").style.display = 'none';

                document.getElementById("lm1").textContent = 'Origin | Start';
                document.getElementById("lm2").textContent = 'Game Dev | First Middle';
                document.getElementById("lm3").textContent = 'Fluxblade | Right';
                document.getElementById("lm4").textContent = 'Honorbound | Left';
                document.getElementById("lm5").textContent = 'This Website | Last Middle';
                document.getElementById("lc1").textContent = 'Origin | Start';
                document.getElementById("lc2").textContent = 'Game Dev | First Middle';
                document.getElementById("lc3").textContent = 'Fluxblade | Right';
                document.getElementById("lc4").textContent = 'Honorbound | Left';
                document.getElementById("lc5").textContent = 'About This Website | Last Middle';

                worldsTraversed++;
            }
            break;
        case 3:
            if(setworld3){
                setworld3 = false;
                setPos3 = true;
                document.getElementById("intro").textContent="Goals, Music, Graphic Design";
                document.getElementById("m1").style.display = 'block';
                document.getElementById("m2").style.display = 'block';
                document.getElementById("m3").style.display = 'block';
                document.getElementById("m4").style.display = 'none';
                document.getElementById("c1").style.display = 'none';
                document.getElementById("c2").style.display = 'none';
                document.getElementById("c3").style.display = 'none';
                document.getElementById("c4").style.display = 'block';

                document.getElementById("lm1").textContent = 'Origin | Start';
                document.getElementById("lm2").textContent = 'Goals | First Middle';
                document.getElementById("lm3").textContent = 'Graphic Design | Right';
                document.getElementById("lm4").textContent = 'Sound Design | Left';
                document.getElementById("lm5").textContent = 'Technology | Last Middle';
                document.getElementById("lc1").textContent = 'Origin | Start';
                document.getElementById("lc2").textContent = 'Goals | First Middle';
                document.getElementById("lc3").textContent = 'Graphic Design | Right';
                document.getElementById("lc4").textContent = 'Sound Design | left';
                document.getElementById("lc5").textContent = 'Technology | Last Middle';

                worldsTraversed++;
            }
            break;
    }

}

export function updateLandMap(){
    switch (landnum){
        case 0:
            document.getElementById("lm1").style.display = 'none';
            document.getElementById("lm2").style.display = 'block';
            document.getElementById("lm3").style.display = 'block';
            document.getElementById("lm4").style.display = 'block';
            document.getElementById("lm5").style.display = 'block';
            document.getElementById("lc1").style.display = 'block';
            document.getElementById("lc2").style.display = 'none';
            document.getElementById("lc3").style.display = 'none';
            document.getElementById("lc4").style.display = 'none';
            document.getElementById("lc5").style.display = 'none';

            break;
        
        case 1:
            document.getElementById("lm1").style.display = 'block';
            document.getElementById("lm2").style.display = 'none';
            document.getElementById("lm3").style.display = 'block';
            document.getElementById("lm4").style.display = 'block';
            document.getElementById("lm5").style.display = 'block';
            document.getElementById("lc1").style.display = 'none';
            document.getElementById("lc2").style.display = 'block';
            document.getElementById("lc3").style.display = 'none';
            document.getElementById("lc4").style.display = 'none';
            document.getElementById("lc5").style.display = 'none';
            
            break;
        
        case 2:
            document.getElementById("lm1").style.display = 'block';
            document.getElementById("lm2").style.display = 'block';
            document.getElementById("lm3").style.display = 'none';
            document.getElementById("lm4").style.display = 'block';
            document.getElementById("lm5").style.display = 'block';
            document.getElementById("lc1").style.display = 'none';
            document.getElementById("lc2").style.display = 'none';
            document.getElementById("lc3").style.display = 'block';
            document.getElementById("lc4").style.display = 'none';
            document.getElementById("lc5").style.display = 'none';
            
            break;
        
        case 3:
            document.getElementById("lm1").style.display = 'block';
            document.getElementById("lm2").style.display = 'block';
            document.getElementById("lm3").style.display = 'block';
            document.getElementById("lm4").style.display = 'none';
            document.getElementById("lm5").style.display = 'block';
            document.getElementById("lc1").style.display = 'none';
            document.getElementById("lc2").style.display = 'none';
            document.getElementById("lc3").style.display = 'none';
            document.getElementById("lc4").style.display = 'block';
            document.getElementById("lc5").style.display = 'none';
            
            break;
        
        case 4:
            document.getElementById("lm1").style.display = 'block';
            document.getElementById("lm2").style.display = 'block';
            document.getElementById("lm3").style.display = 'block';
            document.getElementById("lm4").style.display = 'block';
            document.getElementById("lm5").style.display = 'none';
            document.getElementById("lc1").style.display = 'none';
            document.getElementById("lc2").style.display = 'none';
            document.getElementById("lc3").style.display = 'none';
            document.getElementById("lc4").style.display = 'none';
            document.getElementById("lc5").style.display = 'block';
            
            break;

    }
}

export function updatePos0(){
    setPos0 = false;
}

export function updatePos1(){
    setPos1 = false;
}

export function updatePos2(){
    setPos2 = false;
}

export function updatePos3(){
    setPos3 = false;
}