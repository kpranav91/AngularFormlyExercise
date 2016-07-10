(function(){
    'use strict';
    
    var app = angular.module("formlyApp", ['formly', 'formlyBootstrap', 'ngMessages']);
    
    app.config(function run(formlyConfigProvider) {
        formlyConfigProvider.setWrapper([
            {
                template: [
                  '<div class="formly-template-wrapper form-group"',
                  'ng-class="{\'has-error\': options.validation.errorExistsAndShouldBeVisible}">',
                 /* '<label for="{{::id}}">{{options.templateOptions.label}} {{to.required ? \'*\' : \'\'}}</label>',*/
                  '<formly-transclude></formly-transclude>',
                  '<div class="validation"',
                  'ng-if="options.validation.errorExistsAndShouldBeVisible"',
                  'ng-messages="options.formControl.$error">',
                  '<div ng-messages-include="validation.html"></div>',
                  '<div class=\'form_error\' ng-message="{{::name}}" ng-repeat="(name, message) in ::options.validation.messages">',
                  '{{message(options.formControl.$viewValue, options.formControl.$modelValue, this)}}',
                  '</div>',
                  '</div>',
                  '</div>'
                ].join(' ')
            }]
        );
      });
    
    app.run(function run(formlyValidationMessages) {
        formlyValidationMessages.addStringMessage('required', 'override This field is required');
        //formlyValidationMessages.addStringMessage('isUnique', 'Username already exist. Please enter new Username.')
      });
    app.controller("TestCtrl",function(){
        
        var vm = this;
        
        vm.model = {};
        var users = ['bob','john','kent','pranav'];
        function onSubmit(){
            alert(JSON.stringify(vm.model));            
        }
        
        vm.onSubmit = onSubmit;
        vm.fields = [           {
                                    type:'input',
                                    key:'firstname',
                                    templateOptions:
                                    {
                                        required : true,
                                        label:'First Name',
                                        placeholder:'Enter First Name'                                        
                                    }
                                },
                                {
                                    template:"<hr>"
                                },
                                {
                                    type:"input",
                                    key:"lastname",
                                    templateOptions:
                                    {
                                        label:"Last Name",
                                        placeholder:"Enter Last Name"
                                    }
                                },
                                {
                                    type:"input",
                                    key:"username",
                                    templateOptions:
                                    {
                                        label:"User Name",
                                        placeholder:"Enter User Name"
                                    },
                                    validators:{
                                        isUnique:function($viewValue,$modelValue,scope){
                                            var value = $modelValue || $viewValue;
                                            if(value){
                                                if(users.indexOf(value) !== -1)
                                                    return false;
                                                else
                                                    return true;                                            
                                            }
                                        }
                                    }
                                },
                                {
                                    type:"select",
                                    key:"gender",
                                    templateOptions:
                                    {
                                        label:"Gender",
                                        placeholder:"Select Gender",
                                        options:[
                                             {
                                                name:"Select Gender"                                               
                                            },
                                            {
                                                name:"Male",
                                                value:"Male"
                                            },
                                            {
                                                name:"Female",
                                                value:"Female"
                                            }
                                        ]
                                    }
                                }
                    ];
        
        
        
    });
    
})();
    
    