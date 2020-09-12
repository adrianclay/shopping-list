(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{143:function(module,__webpack_exports__,__webpack_require__){"use strict";var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__),semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(793),options=[{text:"Units",value:"units"},{text:"ml",value:"ml"},{text:"g",value:"g"}];function UnitsSelector(_ref){var value=_ref.value,onChange=_ref.onChange,selectProps={options:options};return value?selectProps.value=value:selectProps.defaultValue="units",onChange&&(selectProps.onChange=function(_,_ref2){var value=_ref2.value;"units"===value&&(value=void 0),onChange(value)}),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__.a,selectProps)}__webpack_exports__.a=UnitsSelector;try{UnitsSelector.displayName="UnitsSelector",UnitsSelector.__docgenInfo={description:"",displayName:"UnitsSelector",props:{value:{defaultValue:null,description:"",name:"value",required:!1,type:{name:'"g" | "ml"'}},onChange:{defaultValue:null,description:"",name:"onChange",required:!1,type:{name:'((value?: "g" | "ml") => void) | undefined'}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/ItemList/UnitsSelector/index.tsx#UnitsSelector"]={docgenInfo:UnitsSelector.__docgenInfo,name:"UnitsSelector",path:"src/ItemList/UnitsSelector/index.tsx#UnitsSelector"})}catch(__react_docgen_typescript_loader_error){}try{UnitsSelector.displayName="UnitsSelector",UnitsSelector.__docgenInfo={description:"",displayName:"UnitsSelector",props:{value:{defaultValue:null,description:"",name:"value",required:!1,type:{name:'"g" | "ml"'}},onChange:{defaultValue:null,description:"",name:"onChange",required:!1,type:{name:'((value?: "g" | "ml") => void) | undefined'}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/ItemList/UnitsSelector/index.tsx#UnitsSelector"]={docgenInfo:UnitsSelector.__docgenInfo,name:"UnitsSelector",path:"src/ItemList/UnitsSelector/index.tsx#UnitsSelector"})}catch(__react_docgen_typescript_loader_error){}},406:function(module,exports,__webpack_require__){__webpack_require__(407),__webpack_require__(559),__webpack_require__(560),__webpack_require__(721),__webpack_require__(733),module.exports=__webpack_require__(736)},475:function(module,exports){},49:function(module,__webpack_exports__,__webpack_require__){"use strict";var factory_ts__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(120),ShoppingListFactory=factory_ts__WEBPACK_IMPORTED_MODULE_0__.Sync.makeFactory({id:factory_ts__WEBPACK_IMPORTED_MODULE_0__.each((function(i){return i.toString()})),name:"List o Shopping",owner_uids:["bob"]});__webpack_exports__.a=ShoppingListFactory},560:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__(308)},736:function(module,exports,__webpack_require__){"use strict";(function(module){(0,__webpack_require__(308).configure)([__webpack_require__(737)],module,!1)}).call(this,__webpack_require__(130)(module))},737:function(module,exports,__webpack_require__){var map={"./AddItemForm/index.stories.tsx":787,"./AlphaBanner/index.stories.tsx":788,"./CreateShoppingListForm/index.stories.tsx":789,"./EventLogViewer/index.stories.tsx":785,"./ItemList/EditItemForm/index.stories.tsx":786,"./ItemList/UnitsSelector/index.stories.tsx":783,"./ItemList/index.stories.tsx":790,"./ListSelector/index.stories.tsx":791,"./Login/index.stories.tsx":792};function webpackContext(req){var id=webpackContextResolve(req);return __webpack_require__(id)}function webpackContextResolve(req){if(!__webpack_require__.o(map,req)){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}return map[req]}webpackContext.keys=function webpackContextKeys(){return Object.keys(map)},webpackContext.resolve=webpackContextResolve,module.exports=webpackContext,webpackContext.id=737},783:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"Selector",(function(){return Selector}));var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__),___WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(143),_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(15);__webpack_exports__.default={title:"ItemList/UnitsSelector",component:___WEBPACK_IMPORTED_MODULE_1__.a};var Selector=function Selector(){return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(___WEBPACK_IMPORTED_MODULE_1__.a,{onChange:Object(_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_2__.action)("onChange")})}},785:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"Example",(function(){return index_stories_Example}));var react=__webpack_require__(0),react_default=__webpack_require__.n(react),List=__webpack_require__(805),EventLogViewer_LogEntry=function LogEntry(_ref){var event=_ref.event;return react_default.a.createElement(List.a.Item,null,"".concat(event.item.name," ").concat(event.type," ").concat(event.created_on.toISOString()," "))},EventLogViewer_EventLogViewer=function EventLogViewer(_ref2){var events=_ref2.events;return react_default.a.createElement(List.a,null,events.map((function(event){return react_default.a.createElement(EventLogViewer_LogEntry,{event:event})})))},src_EventLogViewer=EventLogViewer_EventLogViewer;try{EventLogViewer_EventLogViewer.displayName="EventLogViewer",EventLogViewer_EventLogViewer.__docgenInfo={description:"",displayName:"EventLogViewer",props:{events:{defaultValue:null,description:"",name:"events",required:!0,type:{name:"Event[]"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/EventLogViewer/index.tsx#EventLogViewer"]={docgenInfo:EventLogViewer_EventLogViewer.__docgenInfo,name:"EventLogViewer",path:"src/EventLogViewer/index.tsx#EventLogViewer"})}catch(__react_docgen_typescript_loader_error){}try{EventLogViewer_EventLogViewer.displayName="EventLogViewer",EventLogViewer_EventLogViewer.__docgenInfo={description:"",displayName:"EventLogViewer",props:{events:{defaultValue:null,description:"",name:"events",required:!0,type:{name:"Event[]"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/EventLogViewer/index.tsx#EventLogViewer"]={docgenInfo:EventLogViewer_EventLogViewer.__docgenInfo,name:"EventLogViewer",path:"src/EventLogViewer/index.tsx#EventLogViewer"})}catch(__react_docgen_typescript_loader_error){}__webpack_exports__.default={title:"EventLogViewer",component:src_EventLogViewer};var index_stories_events=[{type:"added",item:{name:"Peas",id:"peaz"},created_on:new Date(Date.now()-2592e5)},{type:"deleted",item:{name:"Pudding",id:"puddin"},created_on:new Date(Date.now()-72e5)},{type:"added",item:{name:"Pudding",id:"puddin"},created_on:new Date(Date.now()-9e5)}],index_stories_Example=function Example(){return react_default.a.createElement(src_EventLogViewer,{events:index_stories_events})}},786:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"Example",(function(){return index_stories_Example}));var react=__webpack_require__(0),react_default=__webpack_require__.n(react),dist=__webpack_require__(15),regenerator=__webpack_require__(50),regenerator_default=__webpack_require__.n(regenerator),objectSpread2=__webpack_require__(145),asyncToGenerator=__webpack_require__(96),slicedToArray=__webpack_require__(17),Form=__webpack_require__(804),Input=__webpack_require__(802),Button=__webpack_require__(794),UnitsSelector=__webpack_require__(143);function EditItemFormConstructor(updateItem){return function EditItemForm(_ref){var _item$quantity,_item$quantity2,item=_ref.item,onSave=_ref.onSave,_useState=Object(react.useState)(item.name),_useState2=Object(slicedToArray.a)(_useState,2),itemName=_useState2[0],setItemName=_useState2[1],_useState3=Object(react.useState)((null===(_item$quantity=item.quantity)||void 0===_item$quantity?void 0:_item$quantity.scalar.toString())||""),_useState4=Object(slicedToArray.a)(_useState3,2),itemQuantityScalar=_useState4[0],setQuantityScalar=_useState4[1],_useState5=Object(react.useState)(null===(_item$quantity2=item.quantity)||void 0===_item$quantity2?void 0:_item$quantity2.units),_useState6=Object(slicedToArray.a)(_useState5,2),itemQuantityUnits=_useState6[0],setQuantityUnits=_useState6[1];return react_default.a.createElement(Form.a,null,react_default.a.createElement(Form.a.Field,null,react_default.a.createElement("label",null,"Name",react_default.a.createElement(Input.a,{value:itemName,onChange:function onChange(_ref2){var target=_ref2.target;return setItemName(target.value)}}))),react_default.a.createElement(Form.a.Group,{inline:!0},react_default.a.createElement(Form.a.Field,null,react_default.a.createElement("label",null,"Quantity",react_default.a.createElement(Input.a,{value:itemQuantityScalar,onChange:function onChange(_ref3){var target=_ref3.target;return setQuantityScalar(target.value)},style:{paddingLeft:"1em"}}))),react_default.a.createElement(Form.a.Field,null,react_default.a.createElement(UnitsSelector.a,{value:itemQuantityUnits,onChange:setQuantityUnits}))),react_default.a.createElement(Button.a,{type:"submit",onClick:Object(asyncToGenerator.a)(regenerator_default.a.mark((function _callee(){var updatedItem,scalar;return regenerator_default.a.wrap((function _callee$(_context){for(;;)switch(_context.prev=_context.next){case 0:return updatedItem=Object(objectSpread2.a)(Object(objectSpread2.a)({},item),{},{name:itemName}),(scalar=Number.parseInt(itemQuantityScalar))&&(updatedItem.quantity={scalar:scalar},itemQuantityUnits&&(updatedItem.quantity.units=itemQuantityUnits)),_context.next=5,updateItem(updatedItem);case 5:onSave();case 6:case"end":return _context.stop()}}),_callee)})))},"Save"))}}var ItemList_EditItemForm=EditItemFormConstructor;try{EditItemFormConstructor.displayName="EditItemFormConstructor",EditItemFormConstructor.__docgenInfo={description:"",displayName:"EditItemFormConstructor",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/ItemList/EditItemForm/index.tsx#EditItemFormConstructor"]={docgenInfo:EditItemFormConstructor.__docgenInfo,name:"EditItemFormConstructor",path:"src/ItemList/EditItemForm/index.tsx#EditItemFormConstructor"})}catch(__react_docgen_typescript_loader_error){}try{EditItemFormConstructor.displayName="EditItemFormConstructor",EditItemFormConstructor.__docgenInfo={description:"",displayName:"EditItemFormConstructor",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/ItemList/EditItemForm/index.tsx#EditItemFormConstructor"]={docgenInfo:EditItemFormConstructor.__docgenInfo,name:"EditItemFormConstructor",path:"src/ItemList/EditItemForm/index.tsx#EditItemFormConstructor"})}catch(__react_docgen_typescript_loader_error){}var lib=__webpack_require__(120),ShoppingList=__webpack_require__(49),ShoppingListItem=lib.Sync.makeFactory({id:lib.each((function(i){return i.toString()})),name:"Bacon",list:ShoppingList.a.build()}),index_stories_EditItemForm=ItemList_EditItemForm((function(item){return Object(dist.action)("updateItem")(item),Promise.resolve(100)})),index_stories_item=ShoppingListItem.build({name:"Grapes"}),index_stories_Example=(__webpack_exports__.default={title:"ItemList/EditItemForm",component:index_stories_EditItemForm},function Example(){return react_default.a.createElement(index_stories_EditItemForm,{item:index_stories_item,onSave:Object(dist.action)("onSave")})})},787:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"Example",(function(){return index_stories_Example}));var react=__webpack_require__(0),react_default=__webpack_require__.n(react),regenerator=__webpack_require__(50),regenerator_default=__webpack_require__.n(regenerator),asyncToGenerator=__webpack_require__(96),slicedToArray=__webpack_require__(17),Segment=__webpack_require__(808),Form=__webpack_require__(804),Dropdown=__webpack_require__(146),Button=__webpack_require__(794);var src_AddItemForm=function AddItemFormConstructor(readdShoppingListItem,addShoppingListItem,searchForItems){return function AddItemForm(_ref){var shoppingList=_ref.shoppingList,_useState=Object(react.useState)(""),_useState2=Object(slicedToArray.a)(_useState,2),itemName=_useState2[0],setItemName=_useState2[1],_useState3=Object(react.useState)(!1),_useState4=Object(slicedToArray.a)(_useState3,2),isLoading=_useState4[0],setIsLoading=_useState4[1],_useState5=Object(react.useState)([]),_useState6=Object(slicedToArray.a)(_useState5,2),options=_useState6[0],setOptions=_useState6[1],addItem=function(){var _ref2=Object(asyncToGenerator.a)(regenerator_default.a.mark((function _callee(event){var selectedItem;return regenerator_default.a.wrap((function _callee$(_context){for(;;)switch(_context.prev=_context.next){case 0:event.preventDefault(),(selectedItem=options.find((function(o){return o.name===itemName})))?readdShoppingListItem(selectedItem):addShoppingListItem({name:itemName,list:shoppingList}),setItemName("");case 4:case"end":return _context.stop()}}),_callee)})));return function addItem(_x){return _ref2.apply(this,arguments)}}(),updateOptions=function(){var _ref3=Object(asyncToGenerator.a)(regenerator_default.a.mark((function _callee2(searchQuery){return regenerator_default.a.wrap((function _callee2$(_context2){for(;;)switch(_context2.prev=_context2.next){case 0:return setIsLoading(!0),_context2.t0=setOptions,_context2.next=4,searchForItems(shoppingList,searchQuery);case 4:_context2.t1=_context2.sent,(0,_context2.t0)(_context2.t1),setIsLoading(!1);case 7:case"end":return _context2.stop()}}),_callee2)})));return function updateOptions(_x2){return _ref3.apply(this,arguments)}}();return react_default.a.createElement(Segment.a,null,react_default.a.createElement(Form.a,null,react_default.a.createElement(Form.a.Group,{inline:!0},react_default.a.createElement(Form.a.Field,null,"Item",react_default.a.createElement(Dropdown.a,{allowAdditions:!0,search:!0,selection:!0,loading:isLoading,options:function dropdownOptions(){var dropdownOptions=options.map((function(i){return{key:i.id,text:i.name,value:i.name}}));return""===itemName||dropdownOptions.find((function(o){return o.value===itemName}))||dropdownOptions.push({key:itemName,text:itemName,value:itemName}),dropdownOptions}(),onSearchChange:function onSearchChange(_e,_ref4){var searchQuery=_ref4.searchQuery;return updateOptions(searchQuery)},onChange:function onChange(_e,_ref5){var value=_ref5.value;return setItemName(value)},value:itemName})),react_default.a.createElement(Form.a.Field,null,react_default.a.createElement(Button.a,{onClick:addItem},"Add")))))}},dist=__webpack_require__(15),ShoppingList=__webpack_require__(49),index_stories_AddItemForm=src_AddItemForm(Object(dist.action)("readdShoppingListItem"),Object(dist.action)("addShoppingListItem"),(function(list,query){return Object(dist.action)("searchForItems")(list,query),Promise.resolve([])})),index_stories_shoppingList=(__webpack_exports__.default={title:"AddItemForm",component:index_stories_AddItemForm},ShoppingList.a.build({name:"Butchers list"})),index_stories_Example=function Example(){return react_default.a.createElement(index_stories_AddItemForm,{shoppingList:index_stories_shoppingList})}},788:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"Example",(function(){return index_stories_Example}));var react=__webpack_require__(0),react_default=__webpack_require__.n(react),Segment=__webpack_require__(808),Label=__webpack_require__(144);var src_AlphaBanner=function AlphaBanner(){return react_default.a.createElement(Segment.a,{color:"blue",basic:!0,secondary:!0},react_default.a.createElement(Label.a,{color:"blue",style:{textTransform:"uppercase",letterSpacing:"0.0625em"},basic:!0,horizontal:!0},"Alpha"),"This software is new")},index_stories_Example=(__webpack_exports__.default={title:"AlphaBanner",component:src_AlphaBanner},function Example(){return react_default.a.createElement(src_AlphaBanner,null)})},789:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"Example",(function(){return index_stories_Example}));var objectSpread2=__webpack_require__(145),react=__webpack_require__(0),react_default=__webpack_require__.n(react),regenerator=__webpack_require__(50),regenerator_default=__webpack_require__.n(regenerator),asyncToGenerator=__webpack_require__(96),slicedToArray=__webpack_require__(17),Form=__webpack_require__(804),Button=__webpack_require__(794);function CreateShoppingListFormConstructor(addShoppingList){return function CreateShoppingListForm(_ref){var loggedInUser=_ref.loggedInUser,onCreate=_ref.onCreate,_useState=Object(react.useState)(""),_useState2=Object(slicedToArray.a)(_useState,2),name=_useState2[0],setName=_useState2[1],_useState3=Object(react.useState)(!1),_useState4=Object(slicedToArray.a)(_useState3,2),isLoading=_useState4[0],setIsLoading=_useState4[1],submitHandler=function(){var _ref2=Object(asyncToGenerator.a)(regenerator_default.a.mark((function _callee(event){var list;return regenerator_default.a.wrap((function _callee$(_context){for(;;)switch(_context.prev=_context.next){case 0:return event.preventDefault(),setIsLoading(!0),_context.next=4,addShoppingList({name:name,owner_uids:[loggedInUser.uid]});case 4:list=_context.sent,setIsLoading(!1),onCreate&&onCreate(list);case 7:case"end":return _context.stop()}}),_callee)})));return function submitHandler(_x){return _ref2.apply(this,arguments)}}();return react_default.a.createElement(Form.a,{onSubmit:submitHandler},react_default.a.createElement(Form.a.Field,null,react_default.a.createElement("label",null,"Name",react_default.a.createElement("input",{onChange:function nameChangeHandler(_ref3){var target=_ref3.target;setName(target.value)},value:name}))),react_default.a.createElement(Button.a,{loading:isLoading},isLoading?"Loading":"Create"))}}var src_CreateShoppingListForm=CreateShoppingListFormConstructor;try{CreateShoppingListFormConstructor.displayName="CreateShoppingListFormConstructor",CreateShoppingListFormConstructor.__docgenInfo={description:"",displayName:"CreateShoppingListFormConstructor",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/CreateShoppingListForm/index.tsx#CreateShoppingListFormConstructor"]={docgenInfo:CreateShoppingListFormConstructor.__docgenInfo,name:"CreateShoppingListFormConstructor",path:"src/CreateShoppingListForm/index.tsx#CreateShoppingListFormConstructor"})}catch(__react_docgen_typescript_loader_error){}try{CreateShoppingListFormConstructor.displayName="CreateShoppingListFormConstructor",CreateShoppingListFormConstructor.__docgenInfo={description:"",displayName:"CreateShoppingListFormConstructor",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/CreateShoppingListForm/index.tsx#CreateShoppingListFormConstructor"]={docgenInfo:CreateShoppingListFormConstructor.__docgenInfo,name:"CreateShoppingListFormConstructor",path:"src/CreateShoppingListForm/index.tsx#CreateShoppingListFormConstructor"})}catch(__react_docgen_typescript_loader_error){}var dist=__webpack_require__(15),ShoppingList=__webpack_require__(49),index_stories_CreateShoppingListForm=src_CreateShoppingListForm((function(list){return Object(dist.action)("addShoppingList")(list),new Promise((function(resolve){return setTimeout((function(){return resolve(ShoppingList.a.build(Object(objectSpread2.a)({},list)))}),500)}))})),index_stories_Example=(__webpack_exports__.default={title:"CreateShoppingListForm",component:index_stories_CreateShoppingListForm},function Example(){return react_default.a.createElement(index_stories_CreateShoppingListForm,{loggedInUser:{displayName:"Dmitri",uid:"dmitri"},onCreate:Object(dist.action)("onCreate")})})},790:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"WithItems",(function(){return index_stories_WithItems})),__webpack_require__.d(__webpack_exports__,"WithoutItems",(function(){return index_stories_WithoutItems})),__webpack_require__.d(__webpack_exports__,"Loading",(function(){return index_stories_Loading}));var react=__webpack_require__(0),react_default=__webpack_require__.n(react),slicedToArray=__webpack_require__(17),Segment=__webpack_require__(808),Dimmer=__webpack_require__(806),Loader=__webpack_require__(803),Header=__webpack_require__(809),Icon=__webpack_require__(75),Button=__webpack_require__(794),Label=__webpack_require__(144);var src_ItemList=function ItemListConstructor(subscribeToItemChanges,deleteItem,EditItemForm){return function ItemList(_ref){var shoppingList=_ref.shoppingList,_useState=Object(react.useState)(!0),_useState2=Object(slicedToArray.a)(_useState,2),isLoading=_useState2[0],setIsLoading=_useState2[1],_useState3=Object(react.useState)(void 0),_useState4=Object(slicedToArray.a)(_useState3,2),fetchError=_useState4[0],setFetchError=_useState4[1],_useState5=Object(react.useState)([]),_useState6=Object(slicedToArray.a)(_useState5,2),shoppingListItems=_useState6[0],setShoppingListItems=_useState6[1];return Object(react.useEffect)((function(){return subscribeToItemChanges(shoppingList,(function(stuff){setIsLoading(!1),setShoppingListItems(stuff)}),(function(error){setFetchError(error)}))}),[shoppingList]),fetchError?react_default.a.createElement("p",null,"Error: ",fetchError.message):isLoading?react_default.a.createElement(Segment.a,{placeholder:!0},react_default.a.createElement(Dimmer.a,{active:!0,inverted:!0},react_default.a.createElement(Loader.a,{inverted:!0},"Loading ",shoppingList.name," items."))):0===shoppingListItems.length?react_default.a.createElement(Segment.a,{placeholder:!0},react_default.a.createElement(Header.a,{icon:!0},react_default.a.createElement(Icon.a,{name:"shopping basket"}),"No items in ",shoppingList.name,".")):react_default.a.createElement(react_default.a.Fragment,null," ",shoppingListItems.map((function(item){return react_default.a.createElement(Segment.a,{clearing:!0,key:item.id},react_default.a.createElement(ListItem,{item:item}))}))," ")};function ListItem(_ref2){var item=_ref2.item,_useState7=Object(react.useState)(!1),_useState8=Object(slicedToArray.a)(_useState7,2),isEditing=_useState8[0],setIsEditing=_useState8[1];return isEditing?react_default.a.createElement(EditItemForm,{item:item,onSave:function onSave(){return setIsEditing(!1)}}):react_default.a.createElement(react_default.a.Fragment,null,item.name," ",function quantity(item){var _item$quantity,_item$quantity2;if(item.quantity)return react_default.a.createElement(Label.a,{circular:!0,style:{marginLeft:"1em"}},null===(_item$quantity=item.quantity)||void 0===_item$quantity?void 0:_item$quantity.scalar,null===(_item$quantity2=item.quantity)||void 0===_item$quantity2?void 0:_item$quantity2.units)}(item),react_default.a.createElement(Button.a,{floated:"right",size:"mini",onClick:function onClick(){return deleteItem(item)}},"Delete"),react_default.a.createElement(Button.a,{floated:"right",size:"mini",onClick:function onClick(){return setIsEditing(!0)}},"Edit"))}},dist=__webpack_require__(15),ShoppingList=__webpack_require__(49),index_stories_EditItemForm=function EditItemForm(_ref){var onSave=_ref.onSave;return react_default.a.createElement(react_default.a.Fragment,null,"Edit Form",react_default.a.createElement(Button.a,{floated:"right",size:"mini",onClick:onSave},"Close"))},index_stories_ItemList=src_ItemList((function(list,onUpdate,onError){return onUpdate([{name:"Pickles",list:list,id:"pickles"},{name:"Cream soda",list:list,id:"cream-soda",quantity:{scalar:12}},{name:"Cream",list:list,id:"cream",quantity:{scalar:150,units:"ml"}}]),function(){}}),Object(dist.action)("deleteItem"),index_stories_EditItemForm),index_stories_shoppingList=ShoppingList.a.build(),index_stories_WithItems=(__webpack_exports__.default={title:"ItemList",component:index_stories_ItemList},function WithItems(){return react_default.a.createElement(Segment.a.Group,null,react_default.a.createElement(index_stories_ItemList,{shoppingList:index_stories_shoppingList}))}),ItemListWithoutItems=src_ItemList((function(list,onUpdate,onError){return onUpdate([]),function(){}}),Object(dist.action)("deleteItem"),index_stories_EditItemForm),index_stories_WithoutItems=function WithoutItems(){return react_default.a.createElement(ItemListWithoutItems,{shoppingList:index_stories_shoppingList})},ItemListLoading=src_ItemList((function(list,onUpdate,onError){return function(){}}),Object(dist.action)("deleteItem"),index_stories_EditItemForm),index_stories_Loading=function Loading(){return react_default.a.createElement(ItemListLoading,{shoppingList:index_stories_shoppingList})}},791:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"WithItems",(function(){return index_stories_WithItems})),__webpack_require__.d(__webpack_exports__,"WithError",(function(){return index_stories_WithError})),__webpack_require__.d(__webpack_exports__,"Loading",(function(){return index_stories_Loading}));var react=__webpack_require__(0),react_default=__webpack_require__.n(react),dist=__webpack_require__(15),slicedToArray=__webpack_require__(17),Dropdown=__webpack_require__(146);function ListSelectorConstructor(subscribeToListChanges){return function ListSelector(_ref){var onSelect=_ref.onSelect,loggedInUser=_ref.loggedInUser,value=_ref.value,_useState=Object(react.useState)(!0),_useState2=Object(slicedToArray.a)(_useState,2),isLoading=_useState2[0],setIsLoading=_useState2[1],_useState3=Object(react.useState)(!1),_useState4=Object(slicedToArray.a)(_useState3,2),fetchErrored=_useState4[0],setFetchError=_useState4[1],_useState5=Object(react.useState)([]),_useState6=Object(slicedToArray.a)(_useState5,2),shoppingLists=_useState6[0],setShoppingLists=_useState6[1];return Object(react.useEffect)((function(){return subscribeToListChanges(loggedInUser,(function(shoppingLists){setIsLoading(!1),setShoppingLists(shoppingLists)}),(function(){setFetchError(!0)}))}),[loggedInUser]),fetchErrored?react_default.a.createElement("p",null,"Error"):isLoading?react_default.a.createElement("p",null,"loading"):react_default.a.createElement(Dropdown.a,Object.assign({selection:!0},function dropdownProps(shoppingLists,onSelect,value){var dropdownProps={options:shoppingLists.map((function(shoppingList){return{text:shoppingList.name,value:shoppingList.id}})),onChange:function onChangeHandler(_,_ref2){var value=_ref2.value,list=shoppingLists.find((function(sl){return sl.id===value}));list&&onSelect(list)},placeholder:"Switch shopping list"};value&&(dropdownProps.value=value.id);null===value&&(dropdownProps.value="");return dropdownProps}(shoppingLists,onSelect,value)))}}var src_ListSelector=ListSelectorConstructor;try{ListSelectorConstructor.displayName="ListSelectorConstructor",ListSelectorConstructor.__docgenInfo={description:"",displayName:"ListSelectorConstructor",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/ListSelector/index.tsx#ListSelectorConstructor"]={docgenInfo:ListSelectorConstructor.__docgenInfo,name:"ListSelectorConstructor",path:"src/ListSelector/index.tsx#ListSelectorConstructor"})}catch(__react_docgen_typescript_loader_error){}try{ListSelectorConstructor.displayName="ListSelectorConstructor",ListSelectorConstructor.__docgenInfo={description:"",displayName:"ListSelectorConstructor",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/ListSelector/index.tsx#ListSelectorConstructor"]={docgenInfo:ListSelectorConstructor.__docgenInfo,name:"ListSelectorConstructor",path:"src/ListSelector/index.tsx#ListSelectorConstructor"})}catch(__react_docgen_typescript_loader_error){}var ShoppingList=__webpack_require__(49),index_stories_loggedInUser={uid:"rianne",displayName:"Rianne"},ListSelectorWithItems=src_ListSelector((function(loggedInUser,onUpdate,onError){return onUpdate([ShoppingList.a.build({name:"Christmas wish list"}),ShoppingList.a.build({name:"Weekly shop"})]),function(){}})),index_stories_WithItems=function WithItems(){return react_default.a.createElement(ListSelectorWithItems,{onSelect:Object(dist.action)("onSelect"),loggedInUser:index_stories_loggedInUser})},ListSelectorWithError=src_ListSelector((function(loggedInUser,onUpdate,onError){return onError(),function(){}})),index_stories_WithError=function WithError(){return react_default.a.createElement(ListSelectorWithError,{onSelect:Object(dist.action)("onSelect"),loggedInUser:index_stories_loggedInUser})},ListSelectorLoading=src_ListSelector((function(loggedInUser,onUpdate,onError){return function(){}})),index_stories_Loading=function Loading(){return react_default.a.createElement(ListSelectorLoading,{onSelect:Object(dist.action)("onSelect"),loggedInUser:index_stories_loggedInUser})};__webpack_exports__.default={title:"ListSelector",component:ListSelectorWithItems}},792:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"NotLoggedIn",(function(){return NotLoggedIn})),__webpack_require__.d(__webpack_exports__,"LoggedIn",(function(){return LoggedIn})),__webpack_require__.d(__webpack_exports__,"Loading",(function(){return Loading}));var react=__webpack_require__(0),react_default=__webpack_require__.n(react),dist=__webpack_require__(15),slicedToArray=__webpack_require__(17),Loader=__webpack_require__(803),Button=__webpack_require__(794),Icon=__webpack_require__(75),LoggedInUserContext=react_default.a.createContext(void 0);function LoginConstructor(authenticator){return function Login(_ref){var children=_ref.children,_useState=Object(react.useState)(void 0),_useState2=Object(slicedToArray.a)(_useState,2),currentUser=_useState2[0],setCurrentUser=_useState2[1];return Object(react.useEffect)((function(){authenticator.onAuthStateChanged((function(currentUser){setCurrentUser(currentUser)}))}),[]),void 0===currentUser?react_default.a.createElement(Loader.a,{active:!0},"Loading"):currentUser?react_default.a.createElement(LoggedInUserContext.Provider,{value:currentUser},children):react_default.a.createElement(Button.a,{basic:!0,size:"large",onClick:function onClick(){authenticator.signInWithRedirect()}},react_default.a.createElement(Icon.a,{name:"google"}),"Sign in")}}var src_Login=LoginConstructor;try{LoginConstructor.displayName="LoginConstructor",LoginConstructor.__docgenInfo={description:"",displayName:"LoginConstructor",props:{onAuthStateChanged:{defaultValue:null,description:"",name:"onAuthStateChanged",required:!0,type:{name:"(onUpdate: (currentUser: User | null) => void) => void"}},signInWithRedirect:{defaultValue:null,description:"",name:"signInWithRedirect",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Login/index.tsx#LoginConstructor"]={docgenInfo:LoginConstructor.__docgenInfo,name:"LoginConstructor",path:"src/Login/index.tsx#LoginConstructor"})}catch(__react_docgen_typescript_loader_error){}try{LoginConstructor.displayName="LoginConstructor",LoginConstructor.__docgenInfo={description:"",displayName:"LoginConstructor",props:{onAuthStateChanged:{defaultValue:null,description:"",name:"onAuthStateChanged",required:!0,type:{name:"(onUpdate: (currentUser: User | null) => void) => void"}},signInWithRedirect:{defaultValue:null,description:"",name:"signInWithRedirect",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Login/index.tsx#LoginConstructor"]={docgenInfo:LoginConstructor.__docgenInfo,name:"LoginConstructor",path:"src/Login/index.tsx#LoginConstructor"})}catch(__react_docgen_typescript_loader_error){}function createLoginStory(onAuthStateChanged){var Login=src_Login({onAuthStateChanged:onAuthStateChanged,signInWithRedirect:Object(dist.action)("signInWithRedirect")});return react_default.a.createElement(Login,null,react_default.a.createElement("p",null,"This child node only gets rendered if you're authenticated"))}__webpack_exports__.default={title:"Login"};var NotLoggedIn=function NotLoggedIn(){return createLoginStory((function(onUpdate){onUpdate(null)}))},LoggedIn=function LoggedIn(){return createLoginStory((function(onUpdate){onUpdate({uid:"100",displayName:"Fun"})}))},Loading=function Loading(){return createLoginStory((function(onUpdate){}))}}},[[406,1,2]]]);
//# sourceMappingURL=main.58a87c1071e6e4e2a638.bundle.js.map