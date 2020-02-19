
# Project FingerFighting

## Environment & Tools
Operating system: Windows 10 Pro.

IDE: JetBrains Clion

Compiler: CMake 3.16.0-rc3

Git: GitBash version 2.24.0.windows.2

WampServer Version 3.2.0 64bit

Browsers:
* Chrome (mostly used during development and debugging).

Converter XML=>JSON (online)
https://codebeautify.org/xmltojson
## Purpose
The project is the examination assignment and aims to give a complete picture of the knowledge I acquired during this course. It'll also create a foundation for the examiner to evaluate the extension of my knowledge and the base for my grade. 
With focus on JavaScript the result is to create a web application to register and provide statistics on typewriting, with no inline CSS or JS.  

## Procedures 
First create the base for the project. This include adding .gitignore and README in a global scope and following project structure:

    css/
        stylesheet.css
    img/
        
    js/
        main.js
    JSON/
       
    .gitignore
    index.html
    README.md
Initiated the project to `git` by pushing it to origin master. When origin was updated a new branch was created and was the development branch.
Since the complete application depended on texts, a XML document containing several texts was downloaded from the course instance. Since XML tend to be seen as, if not obsolete, the an old data structure 
so I decided to convert the XML to JSON, using codebeautify.org online converter, but since the XML data was bad, some restructure was needed before the conversion could take place.
A local web server (Wampserver) was configured to run the application and to be able to make http requests for JSON.
To populate the background , logo and start/stop images, images without any restrictions was located and downloaded using google. The images are then put in the dictionary img/.

A first CSS is created using LESS CSS, based on a gross estimation on what HTML - elements would be needed. At first all the HTML is written in `index.html.`. 
As the project proceeded most HTML elements were dynamically created in JS du to the fuss it became trying to manage children, siblings and parents getting some elements whilst creating some. 

I wanted to avoid global eventlistener as far as i could and manage to come up with a solution where one function `startFingerFury(event)` is a wrapper function for all functions managing
the ongoing game.
Even though it was my intention to avoid global occurrences this wasn't always possible and therefore there's a global load event (this is not possible to avoid)
 and a global HTTP: variable in the main.js. But there should not exist any `var` type, instead `let` is used.  

## Discussion 
If I'd do this again I'll do a thoroughly research **before** I start anything, since I've been creating the wheel all over again and not in a very good way either. 
Even though I reckon one should learn by writing there's also a learning process when refactor and tweek existing code to fit my purpose. 

As for the fulfillment the fully implemented functions should be sufficient to reach the lowest grade, but there's infrastructure existing to easily implement some 
more functions, such as choosing language and omit casing. There also prepared for highlighting errors and "passed" characters. 

I leave this project with a lot of lessons learned. Ie, working with eventlisteners. When I started I thought I had an understanding of their behaviour, I didn't. 
Today I have a lot more experience working with them and I've noticed that debugging took less and less time.
Another, very important thing I've learned is to generate the HTML dynamically. Even if I have done this before, it became absolutely clear to me how easy it is to be 
able to loop through a given number and create the element wanted, instead of `copy paste, copy paste`.

The readability is basically non-existing and even though I do my best giving variables describing names and separate code blocks in "logic" parts I don't think it works very well. 

Conclusion: I had a hard time understand eventlisteners and by generate HTML in JS I needed to pu a lot of time in restructuring. GUI-design is hard and sometimes I hate CSS but I discovered LESS CSS
working with this which will make my coming project a bit easier. 