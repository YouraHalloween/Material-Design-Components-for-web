# Material-Design-Components-for-web
Template for creating a theme Google Material components design for web.
The components have been improved for use in desktop applications, as well as some components based on MDC have been added.  
```
The project can be supported by money, beer, burger, clothes and your motorcycle. Thank you 😎  
```
## Latest version of Google Material components for web v.10

## Documentation
- [Demos](https://youra-h.github.io/yii2-material-design-components.html) 
- [MDC Google Components Page](https://github.com/material-components/material-components-web)
- [Color tool](https://material.io/resources/color/#!/?view.left=0&view.right=0)
- [Yii2 material design components](https://github.com/youra-h/yii2-material-design-components)
## Usage

Use the commands to start compiling the project:  
To run and test components in real time
```
npm run start
```
Use the command to compile and test components
```
npm run dev
```
The components will be downloaded to the remote folder
```
npm run dev:remote
```
The path to the remote folder can be changed in the file:
```
webpack.config.js - REMOTE_PATH = ''
```
For production use the build command
```
npm run dev
npm run dev:remote
```

## Change theme
To edit the theme use the file:
```
\src\custom-default-var.scss
```
[Google API Documentation](https://github.com/material-components/material-components-web/tree/master/packages/mdc-theme)
## Testing
The HTML text of the components must be placed in the index.html file
```
index.html
```
You need to connect the component for testing in the file:
```
\src\app-test.js
```
Example:
```javascript
import { MDCMenu } from '@material/menu';
import { MDCList } from '@material/list';

var cntr = [];

function init(classCss, classComponent, func) {
    cntr = [].map.call(document.querySelectorAll(classCss), function (el1) {
        let control = new classComponent(el1);
        
        console.log(control);       
        return control;
    });
}

init('.mdc-menu', MDCMenu);
init('.mdc-list', MDCList);
```
