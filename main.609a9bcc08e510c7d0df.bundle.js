(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{165:function(module,__webpack_exports__,__webpack_require__){"use strict";var _home_runner_work_shopping_list_shopping_list_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(20),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(0);__webpack_exports__.a=function _useService(service){return function useService(initialState,request){var _useState=Object(react__WEBPACK_IMPORTED_MODULE_1__.useState)(!0),_useState2=Object(_home_runner_work_shopping_list_shopping_list_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__.a)(_useState,2),isLoading=_useState2[0],setIsLoading=_useState2[1],_useState3=Object(react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),_useState4=Object(_home_runner_work_shopping_list_shopping_list_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__.a)(_useState3,2),fetchErrored=_useState4[0],setFetchError=_useState4[1],_useState5=Object(react__WEBPACK_IMPORTED_MODULE_1__.useState)(initialState),_useState6=Object(_home_runner_work_shopping_list_shopping_list_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__.a)(_useState5,2),fetchedData=_useState6[0],setFetchedData=_useState6[1];return Object(react__WEBPACK_IMPORTED_MODULE_1__.useEffect)((function(){return service(request,(function(fetchedData){setIsLoading(!1),setFetchedData(fetchedData)}),(function(error){setIsLoading(!1),setFetchError(error)}))}),[request]),[isLoading,fetchErrored,fetchedData]}}},175:function(module,__webpack_exports__,__webpack_require__){"use strict";var factory_ts__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(174),_ShoppingList__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(55),ShoppingListItemFactory=factory_ts__WEBPACK_IMPORTED_MODULE_0__.Sync.makeFactory({id:factory_ts__WEBPACK_IMPORTED_MODULE_0__.each((function(i){return i.toString()})),name:"Bacon",list:_ShoppingList__WEBPACK_IMPORTED_MODULE_1__.a.build(),has_been_bought:!1,added_to_list_on:new Date,quantity:null});__webpack_exports__.a=ShoppingListItemFactory},207:function(module,__webpack_exports__,__webpack_require__){"use strict";var _home_runner_work_shopping_list_shopping_list_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(99),semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(987),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(2),options=[{text:"Units",value:"units"},{text:"ml",value:"ml"},{text:"l",value:"l"},{text:"g",value:"g"},{text:"kg",value:"kg"}];__webpack_exports__.a=function UnitsSelector(_ref){var value=_ref.value,onChange=_ref.onChange,selectProps={options:options};return value?selectProps.value=value:selectProps.defaultValue="units",onChange&&(selectProps.onChange=function(_,_ref2){var value=_ref2.value;onChange("units"===value?void 0:value)}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__.a,Object(_home_runner_work_shopping_list_shopping_list_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__.a)({},selectProps))}},520:function(module,exports,__webpack_require__){__webpack_require__(521),__webpack_require__(676),__webpack_require__(677),__webpack_require__(872),__webpack_require__(876),__webpack_require__(878),__webpack_require__(957),module.exports=__webpack_require__(959)},55:function(module,__webpack_exports__,__webpack_require__){"use strict";var factory_ts__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(174),ShoppingListFactory=factory_ts__WEBPACK_IMPORTED_MODULE_0__.Sync.makeFactory({id:factory_ts__WEBPACK_IMPORTED_MODULE_0__.each((function(i){return i.toString()})),name:"List o Shopping",owner_uids:["bob"]});__webpack_exports__.a=ShoppingListFactory},589:function(module,exports){},677:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__(392)},883:function(module,exports){},885:function(module,exports){},914:function(module,exports){},915:function(module,exports){},959:function(module,exports,__webpack_require__){"use strict";(function(module){(0,__webpack_require__(392).configure)([__webpack_require__(960)],module,!1)}).call(this,__webpack_require__(145)(module))},960:function(module,exports,__webpack_require__){var map={"./AlphaBanner/index.stories.tsx":980,"./CreateShoppingListForm/index.stories.tsx":981,"./ListSelector/index.stories.tsx":982,"./Login/index.stories.tsx":983,"./ShoppingList/AddItemForm/index.stories.tsx":984,"./ShoppingList/EventLogViewer/index.stories.tsx":978,"./ShoppingList/ItemList/EditItemForm/index.stories.tsx":985,"./ShoppingList/ItemList/UnitsSelector/index.stories.tsx":976,"./ShoppingList/ItemList/index.stories.tsx":986};function webpackContext(req){var id=webpackContextResolve(req);return __webpack_require__(id)}function webpackContextResolve(req){if(!__webpack_require__.o(map,req)){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}return map[req]}webpackContext.keys=function webpackContextKeys(){return Object.keys(map)},webpackContext.resolve=webpackContextResolve,module.exports=webpackContext,webpackContext.id=960},976:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"Selector",(function(){return Selector}));var ___WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(207),_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(17),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(2),UnitsSelectorStories={title:"ItemList/UnitsSelector",component:___WEBPACK_IMPORTED_MODULE_0__.a};__webpack_exports__.default=UnitsSelectorStories;var Selector=function Selector(){return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.a,{onChange:Object(_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.action)("onChange")})}},978:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"Example",(function(){return index_stories_Example}));var slicedToArray=__webpack_require__(20),List=__webpack_require__(1003),jsx_runtime=(__webpack_require__(971),__webpack_require__(975),__webpack_require__(2)),timeFormat=function timeFormat(time){var formatter=new Intl.RelativeTimeFormat(void 0,{numeric:"auto"}),diff=((new Date).valueOf()-time.valueOf())/1e3,unit="second";return diff>60&&(unit="minute",(diff/=60)>60&&(unit="hour",(diff/=60)>24&&(unit="day",(diff/=24)>7&&(diff/=7,unit="week")))),formatter.format(-Math.round(diff),unit)},src_RelativeTime=function RelativeTime(_ref){var time=_ref.time;return Object(jsx_runtime.jsx)("time",{dateTime:time.toISOString(),children:timeFormat(time)})},src_useService=__webpack_require__(165),EventLogViewer_LogEntry=function LogEntry(_ref){var event=_ref.event;return Object(jsx_runtime.jsxs)(List.a.Item,{children:["".concat(event.item.name," was ").concat(typeDescription(event)," "),Object(jsx_runtime.jsx)(src_RelativeTime,{time:event.created_on})]})},typeDescription=function typeDescription(event){switch(event.type){case"item_added":return"added";case"item_bought":return"bought"}},EventLogViewer=function _EventLogViewer(eventLogFetcher){var useService=Object(src_useService.a)(eventLogFetcher);return function EventViewer(_ref2){var shoppingList=_ref2.shoppingList,_useService2=useService([],shoppingList),_useService3=Object(slicedToArray.a)(_useService2,3),isLoading=_useService3[0],fetchError=_useService3[1],events=_useService3[2];return fetchError?Object(jsx_runtime.jsx)("div",{children:"Errored"}):isLoading?Object(jsx_runtime.jsx)("div",{children:"Loading"}):0===events.length?Object(jsx_runtime.jsx)("div",{children:"No activity yet."}):Object(jsx_runtime.jsx)(List.a,{children:events.map((function(event,index){return Object(jsx_runtime.jsx)(EventLogViewer_LogEntry,{event:event},index)}))})}},list=__webpack_require__(55).a.build(),index_stories_events=[{list:list,type:"item_added",item:{name:"Peas",id:"peaz"},created_on:new Date(Date.now()-2592e5)},{list:list,type:"item_bought",item:{name:"Pudding",id:"puddin"},created_on:new Date(Date.now()-72e5)},{list:list,type:"item_added",item:{name:"Pudding",id:"puddin"},created_on:new Date(Date.now()-9e5)}],index_stories_EventLogViewer=EventLogViewer((function(_a,onUpdate,_b){return onUpdate(index_stories_events),function(){}})),EventLogViewerStories={title:"EventLogViewer",component:index_stories_EventLogViewer},index_stories_Example=(__webpack_exports__.default=EventLogViewerStories,function Example(){return Object(jsx_runtime.jsx)(index_stories_EventLogViewer,{shoppingList:list})})},980:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"Example",(function(){return index_stories_Example}));var Segment=__webpack_require__(1006),Label=__webpack_require__(208),jsx_runtime=__webpack_require__(2);var src_AlphaBanner=function AlphaBanner(){return Object(jsx_runtime.jsxs)(Segment.a,{color:"blue",basic:!0,secondary:!0,children:[Object(jsx_runtime.jsx)(Label.a,{color:"black",style:{textTransform:"uppercase",letterSpacing:"0.0625em"},basic:!0,horizontal:!0,children:"Alpha"}),"This software is new"]})},AlphaBannerStories={title:"AlphaBanner",component:src_AlphaBanner},index_stories_Example=(__webpack_exports__.default=AlphaBannerStories,function Example(){return Object(jsx_runtime.jsx)(src_AlphaBanner,{})})},981:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"Example",(function(){return index_stories_Example}));var objectSpread2=__webpack_require__(99),regenerator=__webpack_require__(73),regenerator_default=__webpack_require__.n(regenerator),asyncToGenerator=__webpack_require__(137),slicedToArray=__webpack_require__(20),react=__webpack_require__(0),Form=__webpack_require__(1002),Button=__webpack_require__(988),jsx_runtime=__webpack_require__(2);var src_CreateShoppingListForm=function CreateShoppingListFormConstructor(addShoppingList){return function CreateShoppingListForm(_ref){var loggedInUser=_ref.loggedInUser,onCreate=_ref.onCreate,_useState=Object(react.useState)(""),_useState2=Object(slicedToArray.a)(_useState,2),name=_useState2[0],setName=_useState2[1],_useState3=Object(react.useState)(!1),_useState4=Object(slicedToArray.a)(_useState3,2),isLoading=_useState4[0],setIsLoading=_useState4[1],submitHandler=function(){var _ref2=Object(asyncToGenerator.a)(regenerator_default.a.mark((function _callee(event){var list;return regenerator_default.a.wrap((function _callee$(_context){for(;;)switch(_context.prev=_context.next){case 0:return event.preventDefault(),setIsLoading(!0),_context.next=4,addShoppingList({name:name,owner_uids:[loggedInUser.uid]});case 4:list=_context.sent,setIsLoading(!1),onCreate&&onCreate(list);case 7:case"end":return _context.stop()}}),_callee)})));return function submitHandler(_x){return _ref2.apply(this,arguments)}}();return Object(jsx_runtime.jsxs)(Form.a,{onSubmit:submitHandler,children:[Object(jsx_runtime.jsx)(Form.a.Field,{children:Object(jsx_runtime.jsxs)("label",{children:["Name",Object(jsx_runtime.jsx)("input",{onChange:function nameChangeHandler(_ref3){var target=_ref3.target;setName(target.value)},value:name})]})}),Object(jsx_runtime.jsx)(Button.a,{loading:isLoading,children:isLoading?"Loading":"Create"})]})}},esm=__webpack_require__(17),ShoppingList=__webpack_require__(55),index_stories_CreateShoppingListForm=src_CreateShoppingListForm((function(list){return Object(esm.action)("addShoppingList")(list),new Promise((function(resolve){return setTimeout((function(){return resolve(ShoppingList.a.build(Object(objectSpread2.a)({},list)))}),500)}))})),CreateShoppingListFormStories={title:"CreateShoppingListForm",component:index_stories_CreateShoppingListForm},index_stories_Example=(__webpack_exports__.default=CreateShoppingListFormStories,function Example(){return Object(jsx_runtime.jsx)(index_stories_CreateShoppingListForm,{loggedInUser:{displayName:"Dmitri",uid:"dmitri"},onCreate:Object(esm.action)("onCreate")})})},982:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"WithItems",(function(){return index_stories_WithItems})),__webpack_require__.d(__webpack_exports__,"WithError",(function(){return index_stories_WithError})),__webpack_require__.d(__webpack_exports__,"Loading",(function(){return index_stories_Loading}));var esm=__webpack_require__(17),objectSpread2=__webpack_require__(99),slicedToArray=__webpack_require__(20),Dropdown=__webpack_require__(209),src_useService=__webpack_require__(165),jsx_runtime=__webpack_require__(2);var src_ListSelector=function ListSelectorConstructor(subscribeToListChanges){var useService=Object(src_useService.a)(subscribeToListChanges);return function ListSelector(_ref){var onSelect=_ref.onSelect,loggedInUser=_ref.loggedInUser,value=_ref.value,_useService2=useService([],loggedInUser),_useService3=Object(slicedToArray.a)(_useService2,3),isLoading=_useService3[0],fetchErrored=_useService3[1],shoppingLists=_useService3[2];return fetchErrored?Object(jsx_runtime.jsx)("p",{children:"Error"}):isLoading?Object(jsx_runtime.jsx)("p",{children:"loading"}):Object(jsx_runtime.jsx)(Dropdown.a,Object(objectSpread2.a)({selection:!0},function dropdownProps(shoppingLists,onSelect,value){var dropdownProps={options:shoppingLists.map((function(shoppingList){return{text:shoppingList.name,value:shoppingList.id}})),onChange:function onChangeHandler(_,_ref2){var value=_ref2.value,list=shoppingLists.find((function(sl){return sl.id===value}));list&&onSelect(list)},placeholder:"Switch shopping list"};value&&(dropdownProps.value=value.id);null===value&&(dropdownProps.value="");return dropdownProps}(shoppingLists,onSelect,value)))}},ShoppingList=__webpack_require__(55),index_stories_loggedInUser={uid:"rianne",displayName:"Rianne"},ListSelectorWithItems=src_ListSelector((function(loggedInUser,onUpdate,onError){return onUpdate([ShoppingList.a.build({name:"Christmas wish list"}),ShoppingList.a.build({name:"Weekly shop"})]),function(){}})),index_stories_WithItems=function WithItems(){return Object(jsx_runtime.jsx)(ListSelectorWithItems,{onSelect:Object(esm.action)("onSelect"),loggedInUser:index_stories_loggedInUser})},ListSelectorWithError=src_ListSelector((function(loggedInUser,onUpdate,onError){return onError(new Error("Lack of wiggle juice")),function(){}})),index_stories_WithError=function WithError(){return Object(jsx_runtime.jsx)(ListSelectorWithError,{onSelect:Object(esm.action)("onSelect"),loggedInUser:index_stories_loggedInUser})},ListSelectorLoading=src_ListSelector((function(loggedInUser,onUpdate,onError){return function(){}})),index_stories_Loading=function Loading(){return Object(jsx_runtime.jsx)(ListSelectorLoading,{onSelect:Object(esm.action)("onSelect"),loggedInUser:index_stories_loggedInUser})},ListSelectorStories={title:"ListSelector",component:ListSelectorWithItems};__webpack_exports__.default=ListSelectorStories},983:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"NotLoggedIn",(function(){return NotLoggedIn})),__webpack_require__.d(__webpack_exports__,"LoggedIn",(function(){return LoggedIn})),__webpack_require__.d(__webpack_exports__,"Loading",(function(){return Loading}));var esm=__webpack_require__(17),slicedToArray=__webpack_require__(20),react=__webpack_require__(0),react_default=__webpack_require__.n(react),Loader=__webpack_require__(1001),Button=__webpack_require__(988),Icon=__webpack_require__(100),jsx_runtime=__webpack_require__(2),LoggedInUserContext=react_default.a.createContext(void 0);var src_Login=function LoginConstructor(authenticator){return function Login(_ref){var children=_ref.children,_useState=Object(react.useState)(void 0),_useState2=Object(slicedToArray.a)(_useState,2),currentUser=_useState2[0],setCurrentUser=_useState2[1];return Object(react.useEffect)((function(){authenticator.onAuthStateChanged((function(currentUser){setCurrentUser(currentUser)}))}),[]),void 0===currentUser?Object(jsx_runtime.jsx)(Loader.a,{active:!0,children:"Loading"}):currentUser?Object(jsx_runtime.jsx)(LoggedInUserContext.Provider,{value:currentUser,children:children}):Object(jsx_runtime.jsxs)(Button.a,{basic:!0,size:"large",onClick:function onClick(){authenticator.signInWithRedirect()},children:[Object(jsx_runtime.jsx)(Icon.a,{name:"google"}),"Sign in"]})}};function createLoginStory(onAuthStateChanged){var Login=src_Login({onAuthStateChanged:onAuthStateChanged,signInWithRedirect:Object(esm.action)("signInWithRedirect")});return Object(jsx_runtime.jsx)(Login,{children:Object(jsx_runtime.jsx)("p",{children:"This child node only gets rendered if you're authenticated"})})}__webpack_exports__.default={title:"Login"};var NotLoggedIn=function NotLoggedIn(){return createLoginStory((function(onUpdate){onUpdate(null)}))},LoggedIn=function LoggedIn(){return createLoginStory((function(onUpdate){onUpdate({uid:"100",displayName:"Fun"})}))},Loading=function Loading(){return createLoginStory((function(onUpdate){}))}},984:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"Example",(function(){return index_stories_Example}));var regenerator=__webpack_require__(73),regenerator_default=__webpack_require__.n(regenerator),asyncToGenerator=__webpack_require__(137),slicedToArray=__webpack_require__(20),react=__webpack_require__(0),Segment=__webpack_require__(1006),Form=__webpack_require__(1002),Dropdown=__webpack_require__(209),Button=__webpack_require__(988),jsx_runtime=__webpack_require__(2);var ShoppingList_AddItemForm=function AddItemFormConstructor(addToShoppingList,searchForItems){return function AddItemForm(_ref){var shoppingList=_ref.shoppingList,_useState=Object(react.useState)(""),_useState2=Object(slicedToArray.a)(_useState,2),itemName=_useState2[0],setItemName=_useState2[1],_useState3=Object(react.useState)(!1),_useState4=Object(slicedToArray.a)(_useState3,2),isLoading=_useState4[0],setIsLoading=_useState4[1],_useState5=Object(react.useState)([]),_useState6=Object(slicedToArray.a)(_useState5,2),options=_useState6[0],setOptions=_useState6[1],addItem=function(){var _ref2=Object(asyncToGenerator.a)(regenerator_default.a.mark((function _callee(event){return regenerator_default.a.wrap((function _callee$(_context){for(;;)switch(_context.prev=_context.next){case 0:event.preventDefault(),addToShoppingList({name:itemName,list:shoppingList}),setItemName("");case 3:case"end":return _context.stop()}}),_callee)})));return function addItem(_x){return _ref2.apply(this,arguments)}}(),updateOptions=function(){var _ref3=Object(asyncToGenerator.a)(regenerator_default.a.mark((function _callee2(searchQuery){return regenerator_default.a.wrap((function _callee2$(_context2){for(;;)switch(_context2.prev=_context2.next){case 0:return setIsLoading(!0),_context2.t0=setOptions,_context2.next=4,searchForItems(shoppingList,searchQuery);case 4:_context2.t1=_context2.sent,(0,_context2.t0)(_context2.t1),setIsLoading(!1);case 7:case"end":return _context2.stop()}}),_callee2)})));return function updateOptions(_x2){return _ref3.apply(this,arguments)}}();return Object(jsx_runtime.jsx)(Segment.a,{children:Object(jsx_runtime.jsx)(Form.a,{children:Object(jsx_runtime.jsxs)(Form.a.Group,{inline:!0,children:[Object(jsx_runtime.jsxs)(Form.a.Field,{children:["Item",Object(jsx_runtime.jsx)(Dropdown.a,{allowAdditions:!0,search:!0,selection:!0,loading:isLoading,options:function dropdownOptions(){var dropdownOptions=options.map((function(i){return{key:i.id,text:i.name,value:i.name}}));return""===itemName||dropdownOptions.find((function(o){return o.value===itemName}))||dropdownOptions.push({key:itemName,text:itemName,value:itemName}),dropdownOptions}(),onSearchChange:function onSearchChange(_e,_ref4){var searchQuery=_ref4.searchQuery;return updateOptions(searchQuery)},onChange:function onChange(_e,_ref5){var value=_ref5.value;return setItemName(value)},value:itemName})]}),Object(jsx_runtime.jsx)(Form.a.Field,{children:Object(jsx_runtime.jsx)(Button.a,{onClick:addItem,children:"Add"})})]})})})}},esm=__webpack_require__(17),ShoppingList=__webpack_require__(55),index_stories_AddItemForm=ShoppingList_AddItemForm(Object(esm.action)("addShoppingListItem"),(function(list,query){return Object(esm.action)("searchForItems")(list,query),Promise.resolve([])})),AddItemFormStories={title:"AddItemForm",component:index_stories_AddItemForm},index_stories_shoppingList=(__webpack_exports__.default=AddItemFormStories,ShoppingList.a.build({name:"Butchers list"})),index_stories_Example=function Example(){return Object(jsx_runtime.jsx)(index_stories_AddItemForm,{shoppingList:index_stories_shoppingList})}},985:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"Example",(function(){return index_stories_Example}));var esm=__webpack_require__(17),regenerator=__webpack_require__(73),regenerator_default=__webpack_require__.n(regenerator),objectSpread2=__webpack_require__(99),asyncToGenerator=__webpack_require__(137),slicedToArray=__webpack_require__(20),react=__webpack_require__(0),Form=__webpack_require__(1002),Input=__webpack_require__(1e3),Button=__webpack_require__(988),UnitsSelector=__webpack_require__(207),jsx_runtime=__webpack_require__(2);var ItemList_EditItemForm=function EditItemFormConstructor(saveShoppingListItem){return function EditItemForm(_ref){var _item$quantity,_item$quantity2,item=_ref.item,onSave=_ref.onSave,_useState=Object(react.useState)(item.name),_useState2=Object(slicedToArray.a)(_useState,2),itemName=_useState2[0],setItemName=_useState2[1],_useState3=Object(react.useState)((null===(_item$quantity=item.quantity)||void 0===_item$quantity?void 0:_item$quantity.scalar.toString())||""),_useState4=Object(slicedToArray.a)(_useState3,2),itemQuantityScalar=_useState4[0],setQuantityScalar=_useState4[1],_useState5=Object(react.useState)(null===(_item$quantity2=item.quantity)||void 0===_item$quantity2?void 0:_item$quantity2.units),_useState6=Object(slicedToArray.a)(_useState5,2),itemQuantityUnits=_useState6[0],setQuantityUnits=_useState6[1];return Object(jsx_runtime.jsxs)(Form.a,{children:[Object(jsx_runtime.jsx)(Form.a.Field,{children:Object(jsx_runtime.jsxs)("label",{children:["Name",Object(jsx_runtime.jsx)(Input.a,{value:itemName,onChange:function onChange(_ref2){var target=_ref2.target;return setItemName(target.value)}})]})}),Object(jsx_runtime.jsxs)(Form.a.Group,{inline:!0,children:[Object(jsx_runtime.jsx)(Form.a.Field,{children:Object(jsx_runtime.jsxs)("label",{children:["Quantity",Object(jsx_runtime.jsx)(Input.a,{value:itemQuantityScalar,onChange:function onChange(_ref3){var target=_ref3.target;return setQuantityScalar(target.value)},style:{paddingLeft:"1em"}})]})}),Object(jsx_runtime.jsx)(Form.a.Field,{children:Object(jsx_runtime.jsx)(UnitsSelector.a,{value:itemQuantityUnits,onChange:setQuantityUnits})})]}),Object(jsx_runtime.jsx)(Button.a,{type:"submit",onClick:Object(asyncToGenerator.a)(regenerator_default.a.mark((function _callee(){var updatedItem,scalar;return regenerator_default.a.wrap((function _callee$(_context){for(;;)switch(_context.prev=_context.next){case 0:return updatedItem=Object(objectSpread2.a)(Object(objectSpread2.a)({},item),{},{name:itemName}),scalar=Number.parseInt(itemQuantityScalar),updatedItem.quantity=scalar?{scalar:scalar,units:itemQuantityUnits||null}:null,_context.next=5,saveShoppingListItem(updatedItem);case 5:onSave();case 6:case"end":return _context.stop()}}),_callee)}))),children:"Save"})]})}},ShoppingListItem=__webpack_require__(175),index_stories_EditItemForm=ItemList_EditItemForm((function(item){return Object(esm.action)("updateItem")(item),Promise.resolve(100)})),index_stories_item=ShoppingListItem.a.build({name:"Grapes"}),EditItemFormStories={title:"ItemList/EditItemForm",component:index_stories_EditItemForm},index_stories_Example=(__webpack_exports__.default=EditItemFormStories,function Example(){return Object(jsx_runtime.jsx)(index_stories_EditItemForm,{item:index_stories_item,onSave:Object(esm.action)("onSave")})})},986:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"WithItems",(function(){return index_stories_WithItems})),__webpack_require__.d(__webpack_exports__,"WithoutItems",(function(){return index_stories_WithoutItems})),__webpack_require__.d(__webpack_exports__,"Loading",(function(){return index_stories_Loading}));var slicedToArray=__webpack_require__(20),react=__webpack_require__(0),Segment=__webpack_require__(1006),Dimmer=__webpack_require__(1004),Loader=__webpack_require__(1001),Header=__webpack_require__(1007),Icon=__webpack_require__(100),Button=__webpack_require__(988),Label=__webpack_require__(208),src_useService=__webpack_require__(165),jsx_runtime=__webpack_require__(2);var ShoppingList_ItemList=function ItemListConstructor(listShoppingListItems,buyItemOnShoppingList,EditItemForm){var useService=Object(src_useService.a)(listShoppingListItems);return function ItemList(_ref){var shoppingList=_ref.shoppingList,_useService2=useService([],shoppingList),_useService3=Object(slicedToArray.a)(_useService2,3),isLoading=_useService3[0],fetchError=_useService3[1],shoppingListItems=_useService3[2];return fetchError?Object(jsx_runtime.jsxs)("p",{children:["Error: ",fetchError.message]}):isLoading?Object(jsx_runtime.jsx)(Segment.a,{placeholder:!0,children:Object(jsx_runtime.jsx)(Dimmer.a,{active:!0,inverted:!0,children:Object(jsx_runtime.jsxs)(Loader.a,{inverted:!0,children:["Loading ",shoppingList.name," items."]})})}):0===shoppingListItems.length?Object(jsx_runtime.jsx)(Segment.a,{placeholder:!0,children:Object(jsx_runtime.jsxs)(Header.a,{icon:!0,children:[Object(jsx_runtime.jsx)(Icon.a,{name:"shopping basket"}),"No items in ",shoppingList.name,"."]})}):Object(jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[" ",shoppingListItems.map((function(item){return Object(jsx_runtime.jsx)(Segment.a,{clearing:!0,children:Object(jsx_runtime.jsx)(ListItem,{item:item})},item.id)}))," "]})};function ListItem(_ref2){var item=_ref2.item,_useState=Object(react.useState)(!1),_useState2=Object(slicedToArray.a)(_useState,2),isEditing=_useState2[0],setIsEditing=_useState2[1];return isEditing?Object(jsx_runtime.jsx)(EditItemForm,{item:item,onSave:function onSave(){return setIsEditing(!1)}}):Object(jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[item.name," ",quantity(item),Object(jsx_runtime.jsx)(Button.a,{floated:"right",size:"mini",onClick:function onClick(){return buyItemOnShoppingList(item)},children:"Buy"}),Object(jsx_runtime.jsx)(Button.a,{floated:"right",size:"mini",onClick:function onClick(){return setIsEditing(!0)},children:"Edit"})]})}function quantity(item){var _item$quantity,_item$quantity2;if(item.quantity)return Object(jsx_runtime.jsxs)(Label.a,{circular:!0,style:{marginLeft:"1em"},children:[null===(_item$quantity=item.quantity)||void 0===_item$quantity?void 0:_item$quantity.scalar,null===(_item$quantity2=item.quantity)||void 0===_item$quantity2?void 0:_item$quantity2.units]})}},esm=__webpack_require__(17),ShoppingList=__webpack_require__(55),ShoppingListItem=__webpack_require__(175),index_stories_EditItemForm=function EditItemForm(_ref){var onSave=_ref.onSave;return Object(jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:["Edit Form",Object(jsx_runtime.jsx)(Button.a,{floated:"right",size:"mini",onClick:onSave,children:"Close"})]})},index_stories_ItemList=ShoppingList_ItemList((function(list,onUpdate,onError){return onUpdate([ShoppingListItem.a.build({name:"Pickles",list:list}),ShoppingListItem.a.build({name:"Cream soda",list:list,quantity:{scalar:12}}),ShoppingListItem.a.build({name:"Cream",list:list,id:"cream",quantity:{scalar:150,units:"ml"}})]),function(){}}),Object(esm.action)("deleteItem"),index_stories_EditItemForm),index_stories_shoppingList=ShoppingList.a.build(),ItemListStories={title:"ItemList",component:index_stories_ItemList},index_stories_WithItems=(__webpack_exports__.default=ItemListStories,function WithItems(){return Object(jsx_runtime.jsx)(Segment.a.Group,{children:Object(jsx_runtime.jsx)(index_stories_ItemList,{shoppingList:index_stories_shoppingList})})}),ItemListWithoutItems=ShoppingList_ItemList((function(list,onUpdate,onError){return onUpdate([]),function(){}}),Object(esm.action)("deleteItem"),index_stories_EditItemForm),index_stories_WithoutItems=function WithoutItems(){return Object(jsx_runtime.jsx)(ItemListWithoutItems,{shoppingList:index_stories_shoppingList})},ItemListLoading=ShoppingList_ItemList((function(list,onUpdate,onError){return function(){}}),Object(esm.action)("deleteItem"),index_stories_EditItemForm),index_stories_Loading=function Loading(){return Object(jsx_runtime.jsx)(ItemListLoading,{shoppingList:index_stories_shoppingList})}}},[[520,1,2]]]);
//# sourceMappingURL=main.609a9bcc08e510c7d0df.bundle.js.map