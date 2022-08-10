(self.webpackChunkshopping_list=self.webpackChunkshopping_list||[]).push([[179],{"./src/AlphaBanner/index.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Example:function(){return Example},__namedExportsOrder:function(){return __namedExportsOrder},default:function(){return index_stories}});var Segment=__webpack_require__("./node_modules/semantic-ui-react/dist/es/elements/Segment/Segment.js"),Label=__webpack_require__("./node_modules/semantic-ui-react/dist/es/elements/Label/Label.js"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");var src_AlphaBanner=function AlphaBanner(){return(0,jsx_runtime.jsxs)(Segment.Z,{color:"blue",basic:!0,secondary:!0,children:[(0,jsx_runtime.jsx)(Label.Z,{color:"black",style:{textTransform:"uppercase",letterSpacing:"0.0625em"},basic:!0,horizontal:!0,children:"Alpha"}),"This software is new"]})},index_stories={title:"AlphaBanner",component:src_AlphaBanner},Example=function Example(){return(0,jsx_runtime.jsx)(src_AlphaBanner,{})},__namedExportsOrder=["Example"]},"./src/CreateShoppingListForm/index.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Example:function(){return Example},__namedExportsOrder:function(){return __namedExportsOrder},default:function(){return index_stories}});var objectSpread2=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),asyncToGenerator=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),slicedToArray=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),regenerator=__webpack_require__("./node_modules/@babel/runtime/regenerator/index.js"),regenerator_default=__webpack_require__.n(regenerator),react=__webpack_require__("./node_modules/react/index.js"),Form=__webpack_require__("./node_modules/semantic-ui-react/dist/es/collections/Form/Form.js"),Button=__webpack_require__("./node_modules/semantic-ui-react/dist/es/elements/Button/Button.js"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");var CreateShoppingListForm=function CreateShoppingListFormConstructor(addShoppingList){return function CreateShoppingListForm(_ref){var loggedInUser=_ref.loggedInUser,onCreate=_ref.onCreate,_useState=(0,react.useState)(""),_useState2=(0,slicedToArray.Z)(_useState,2),name=_useState2[0],setName=_useState2[1],_useState3=(0,react.useState)(!1),_useState4=(0,slicedToArray.Z)(_useState3,2),isLoading=_useState4[0],setIsLoading=_useState4[1],submitHandler=function(){var _ref2=(0,asyncToGenerator.Z)(regenerator_default().mark((function _callee(event){var list;return regenerator_default().wrap((function _callee$(_context){for(;;)switch(_context.prev=_context.next){case 0:return event.preventDefault(),setIsLoading(!0),_context.next=4,addShoppingList({name:name,owner_uids:[loggedInUser.uid]});case 4:list=_context.sent,setIsLoading(!1),onCreate&&onCreate(list);case 7:case"end":return _context.stop()}}),_callee)})));return function submitHandler(_x){return _ref2.apply(this,arguments)}}();return(0,jsx_runtime.jsxs)(Form.Z,{onSubmit:submitHandler,children:[(0,jsx_runtime.jsx)(Form.Z.Field,{children:(0,jsx_runtime.jsxs)("label",{children:["Name",(0,jsx_runtime.jsx)("input",{onChange:function nameChangeHandler(_ref3){var target=_ref3.target;setName(target.value)},value:name})]})}),(0,jsx_runtime.jsx)(Button.Z,{loading:isLoading,children:isLoading?"Loading":"Create"})]})}},esm=__webpack_require__("./node_modules/@storybook/addon-actions/dist/esm/index.js"),ShoppingList=__webpack_require__("./src/factories/ShoppingList.ts"),index_stories_CreateShoppingListForm=CreateShoppingListForm((function(list){return(0,esm.action)("addShoppingList")(list),new Promise((function(resolve){return setTimeout((function(){return resolve(ShoppingList.Z.build((0,objectSpread2.Z)({},list)))}),500)}))})),index_stories={title:"CreateShoppingListForm",component:index_stories_CreateShoppingListForm},Example=function Example(){return(0,jsx_runtime.jsx)(index_stories_CreateShoppingListForm,{loggedInUser:{displayName:"Dmitri",uid:"dmitri"},onCreate:(0,esm.action)("onCreate")})},__namedExportsOrder=["Example"]},"./src/ListSelector/index.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Loading:function(){return Loading},WithError:function(){return WithError},WithItems:function(){return WithItems},__namedExportsOrder:function(){return __namedExportsOrder},default:function(){return index_stories}});var esm=__webpack_require__("./node_modules/@storybook/addon-actions/dist/esm/index.js"),objectSpread2=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),slicedToArray=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),Dropdown=__webpack_require__("./node_modules/semantic-ui-react/dist/es/modules/Dropdown/Dropdown.js"),src_useService=__webpack_require__("./src/useService.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");var ListSelector=function ListSelectorConstructor(subscribeToListChanges){var useService=(0,src_useService.Z)(subscribeToListChanges);return function ListSelector(_ref){var onSelect=_ref.onSelect,loggedInUser=_ref.loggedInUser,value=_ref.value,_useService2=useService([],loggedInUser),_useService3=(0,slicedToArray.Z)(_useService2,3),isLoading=_useService3[0],fetchErrored=_useService3[1],shoppingLists=_useService3[2];return fetchErrored?(0,jsx_runtime.jsx)("p",{children:"Error"}):isLoading?(0,jsx_runtime.jsx)("p",{children:"loading"}):(0,jsx_runtime.jsx)(Dropdown.Z,(0,objectSpread2.Z)({selection:!0},function dropdownProps(shoppingLists,onSelect,value){var onChangeHandler=function onChangeHandler(_,_ref2){var value=_ref2.value,list=shoppingLists.find((function(sl){return sl.id===value}));list&&onSelect(list)},dropdownProps={options:shoppingLists.map((function(shoppingList){return{text:shoppingList.name,value:shoppingList.id}})),onChange:onChangeHandler,placeholder:"Switch shopping list"};value&&(dropdownProps.value=value.id);null===value&&(dropdownProps.value="");return dropdownProps}(shoppingLists,onSelect,value)))}},ShoppingList=__webpack_require__("./src/factories/ShoppingList.ts"),loggedInUser={uid:"rianne",displayName:"Rianne"},ListSelectorWithItems=ListSelector((function(loggedInUser,onUpdate,onError){return onUpdate([ShoppingList.Z.build({name:"Christmas wish list"}),ShoppingList.Z.build({name:"Weekly shop"})]),function(){}})),WithItems=function WithItems(){return(0,jsx_runtime.jsx)(ListSelectorWithItems,{onSelect:(0,esm.action)("onSelect"),loggedInUser:loggedInUser})},ListSelectorWithError=ListSelector((function(loggedInUser,onUpdate,onError){return onError(new Error("Lack of wiggle juice")),function(){}})),WithError=function WithError(){return(0,jsx_runtime.jsx)(ListSelectorWithError,{onSelect:(0,esm.action)("onSelect"),loggedInUser:loggedInUser})},ListSelectorLoading=ListSelector((function(loggedInUser,onUpdate,onError){return function(){}})),Loading=function Loading(){return(0,jsx_runtime.jsx)(ListSelectorLoading,{onSelect:(0,esm.action)("onSelect"),loggedInUser:loggedInUser})},index_stories={title:"ListSelector",component:ListSelectorWithItems},__namedExportsOrder=["WithItems","WithError","Loading"]},"./src/Login/index.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Loading:function(){return Loading},LoggedIn:function(){return LoggedIn},NotLoggedIn:function(){return NotLoggedIn},__namedExportsOrder:function(){return __namedExportsOrder},default:function(){return index_stories}});var esm=__webpack_require__("./node_modules/@storybook/addon-actions/dist/esm/index.js"),slicedToArray=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),react=__webpack_require__("./node_modules/react/index.js"),Loader=__webpack_require__("./node_modules/semantic-ui-react/dist/es/elements/Loader/Loader.js"),Button=__webpack_require__("./node_modules/semantic-ui-react/dist/es/elements/Button/Button.js"),Icon=__webpack_require__("./node_modules/semantic-ui-react/dist/es/elements/Icon/Icon.js"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),LoggedInUserContext=react.createContext(void 0);var src_Login=function LoginConstructor(authenticator){return function Login(_ref){var children=_ref.children,_useState=(0,react.useState)(void 0),_useState2=(0,slicedToArray.Z)(_useState,2),currentUser=_useState2[0],setCurrentUser=_useState2[1];return(0,react.useEffect)((function(){authenticator.onAuthStateChanged((function(currentUser){setCurrentUser(currentUser)}))}),[]),void 0===currentUser?(0,jsx_runtime.jsx)(Loader.Z,{active:!0,children:"Loading"}):currentUser?(0,jsx_runtime.jsx)(LoggedInUserContext.Provider,{value:currentUser,children:children}):(0,jsx_runtime.jsxs)(Button.Z,{basic:!0,size:"large",onClick:function onClick(){authenticator.signInWithRedirect()},children:[(0,jsx_runtime.jsx)(Icon.Z,{name:"google"}),"Sign in"]})}};function createLoginStory(onAuthStateChanged){var Login=src_Login({onAuthStateChanged:onAuthStateChanged,signInWithRedirect:(0,esm.action)("signInWithRedirect")});return(0,jsx_runtime.jsx)(Login,{children:(0,jsx_runtime.jsx)("p",{children:"This child node only gets rendered if you're authenticated"})})}var index_stories={title:"Login"},NotLoggedIn=function NotLoggedIn(){return createLoginStory((function(onUpdate){onUpdate(null)}))},LoggedIn=function LoggedIn(){return createLoginStory((function(onUpdate){onUpdate({uid:"100",displayName:"Fun"})}))},Loading=function Loading(){return createLoginStory((function(onUpdate){}))},__namedExportsOrder=["NotLoggedIn","LoggedIn","Loading"]},"./src/ShoppingList/AddItemForm/index.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Example:function(){return Example},__namedExportsOrder:function(){return __namedExportsOrder},default:function(){return index_stories}});var asyncToGenerator=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),slicedToArray=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),regenerator=__webpack_require__("./node_modules/@babel/runtime/regenerator/index.js"),regenerator_default=__webpack_require__.n(regenerator),react=__webpack_require__("./node_modules/react/index.js"),Segment=__webpack_require__("./node_modules/semantic-ui-react/dist/es/elements/Segment/Segment.js"),Form=__webpack_require__("./node_modules/semantic-ui-react/dist/es/collections/Form/Form.js"),Dropdown=__webpack_require__("./node_modules/semantic-ui-react/dist/es/modules/Dropdown/Dropdown.js"),Button=__webpack_require__("./node_modules/semantic-ui-react/dist/es/elements/Button/Button.js"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");var AddItemForm=function AddItemFormConstructor(addToShoppingList,searchForItems){return function AddItemForm(_ref){var shoppingList=_ref.shoppingList,_useState=(0,react.useState)(""),_useState2=(0,slicedToArray.Z)(_useState,2),itemName=_useState2[0],setItemName=_useState2[1],_useState3=(0,react.useState)(!1),_useState4=(0,slicedToArray.Z)(_useState3,2),isLoading=_useState4[0],setIsLoading=_useState4[1],_useState5=(0,react.useState)([]),_useState6=(0,slicedToArray.Z)(_useState5,2),options=_useState6[0],setOptions=_useState6[1],addItem=function(){var _ref2=(0,asyncToGenerator.Z)(regenerator_default().mark((function _callee(event){return regenerator_default().wrap((function _callee$(_context){for(;;)switch(_context.prev=_context.next){case 0:event.preventDefault(),addToShoppingList({name:itemName,list:shoppingList}),setItemName("");case 3:case"end":return _context.stop()}}),_callee)})));return function addItem(_x){return _ref2.apply(this,arguments)}}(),updateOptions=function(){var _ref3=(0,asyncToGenerator.Z)(regenerator_default().mark((function _callee2(searchQuery){return regenerator_default().wrap((function _callee2$(_context2){for(;;)switch(_context2.prev=_context2.next){case 0:return setIsLoading(!0),_context2.t0=setOptions,_context2.next=4,searchForItems(shoppingList,searchQuery);case 4:_context2.t1=_context2.sent,(0,_context2.t0)(_context2.t1),setIsLoading(!1);case 7:case"end":return _context2.stop()}}),_callee2)})));return function updateOptions(_x2){return _ref3.apply(this,arguments)}}();return(0,jsx_runtime.jsx)(Segment.Z,{children:(0,jsx_runtime.jsx)(Form.Z,{children:(0,jsx_runtime.jsxs)(Form.Z.Group,{inline:!0,children:[(0,jsx_runtime.jsxs)(Form.Z.Field,{children:["Item",(0,jsx_runtime.jsx)(Dropdown.Z,{allowAdditions:!0,search:!0,selection:!0,loading:isLoading,options:function dropdownOptions(){var dropdownOptions=options.map((function(i){return{key:i.id,text:i.name,value:i.name}}));return""===itemName||dropdownOptions.find((function(o){return o.value===itemName}))||dropdownOptions.push({key:itemName,text:itemName,value:itemName}),dropdownOptions}(),onSearchChange:function onSearchChange(_e,_ref4){var searchQuery=_ref4.searchQuery;return updateOptions(searchQuery)},onChange:function onChange(_e,_ref5){var value=_ref5.value;return setItemName(value)},value:itemName})]}),(0,jsx_runtime.jsx)(Form.Z.Field,{children:(0,jsx_runtime.jsx)(Button.Z,{onClick:addItem,children:"Add"})})]})})})}},esm=__webpack_require__("./node_modules/@storybook/addon-actions/dist/esm/index.js"),ShoppingList=__webpack_require__("./src/factories/ShoppingList.ts"),index_stories_AddItemForm=AddItemForm((0,esm.action)("addShoppingListItem"),(function(list,query){return(0,esm.action)("searchForItems")(list,query),Promise.resolve([])})),index_stories={title:"AddItemForm",component:index_stories_AddItemForm},shoppingList=ShoppingList.Z.build({name:"Butchers list"}),Example=function Example(){return(0,jsx_runtime.jsx)(index_stories_AddItemForm,{shoppingList:shoppingList})},__namedExportsOrder=["Example"]},"./src/ShoppingList/EventLogViewer/index.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Example:function(){return Example},__namedExportsOrder:function(){return __namedExportsOrder},default:function(){return index_stories}});var slicedToArray=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),List=__webpack_require__("./node_modules/semantic-ui-react/dist/es/elements/List/List.js"),jsx_runtime=(__webpack_require__("./node_modules/@formatjs/intl-relativetimeformat/polyfill.js"),__webpack_require__("./node_modules/@formatjs/intl-relativetimeformat/locale-data/en.js"),__webpack_require__("./node_modules/react/jsx-runtime.js")),timeFormat=function timeFormat(time){var formatter=new Intl.RelativeTimeFormat(void 0,{numeric:"auto"}),diff=((new Date).valueOf()-time.valueOf())/1e3,unit="second";return diff>60&&(unit="minute",(diff/=60)>60&&(unit="hour",(diff/=60)>24&&(unit="day",(diff/=24)>7&&(diff/=7,unit="week")))),formatter.format(-Math.round(diff),unit)},src_RelativeTime=function RelativeTime(_ref){var time=_ref.time;return(0,jsx_runtime.jsx)("time",{dateTime:time.toISOString(),children:timeFormat(time)})},src_useService=__webpack_require__("./src/useService.ts"),LogEntry=function LogEntry(_ref){var event=_ref.event;return(0,jsx_runtime.jsxs)(List.Z.Item,{children:["".concat(event.item.name," was ").concat(typeDescription(event)," "),(0,jsx_runtime.jsx)(src_RelativeTime,{time:event.created_on})]})},typeDescription=function typeDescription(event){switch(event.type){case"item_added":return"added";case"item_bought":return"bought"}},EventLogViewer=function _EventLogViewer(eventLogFetcher){var useService=(0,src_useService.Z)(eventLogFetcher);return function EventViewer(_ref2){var shoppingList=_ref2.shoppingList,_useService2=useService([],shoppingList),_useService3=(0,slicedToArray.Z)(_useService2,3),isLoading=_useService3[0],fetchError=_useService3[1],events=_useService3[2];return fetchError?(0,jsx_runtime.jsx)("div",{children:"Errored"}):isLoading?(0,jsx_runtime.jsx)("div",{children:"Loading"}):0===events.length?(0,jsx_runtime.jsx)("div",{children:"No activity yet."}):(0,jsx_runtime.jsx)(List.Z,{children:events.map((function(event,index){return(0,jsx_runtime.jsx)(LogEntry,{event:event},index)}))})}},list=__webpack_require__("./src/factories/ShoppingList.ts").Z.build(),events=[{list:list,type:"item_added",item:{name:"Peas",id:"peaz"},created_on:new Date(Date.now()-2592e5)},{list:list,type:"item_bought",item:{name:"Pudding",id:"puddin"},created_on:new Date(Date.now()-72e5)},{list:list,type:"item_added",item:{name:"Pudding",id:"puddin"},created_on:new Date(Date.now()-9e5)}],index_stories_EventLogViewer=EventLogViewer((function(_a,onUpdate,_b){return onUpdate(events),function(){}})),index_stories={title:"EventLogViewer",component:index_stories_EventLogViewer},Example=function Example(){return(0,jsx_runtime.jsx)(index_stories_EventLogViewer,{shoppingList:list})},__namedExportsOrder=["Example"]},"./src/ShoppingList/ItemList/EditItemForm/index.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Example:function(){return Example},__namedExportsOrder:function(){return __namedExportsOrder},default:function(){return index_stories}});var esm=__webpack_require__("./node_modules/@storybook/addon-actions/dist/esm/index.js"),objectSpread2=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),asyncToGenerator=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),slicedToArray=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),regenerator=__webpack_require__("./node_modules/@babel/runtime/regenerator/index.js"),regenerator_default=__webpack_require__.n(regenerator),react=__webpack_require__("./node_modules/react/index.js"),Form=__webpack_require__("./node_modules/semantic-ui-react/dist/es/collections/Form/Form.js"),Input=__webpack_require__("./node_modules/semantic-ui-react/dist/es/elements/Input/Input.js"),Button=__webpack_require__("./node_modules/semantic-ui-react/dist/es/elements/Button/Button.js"),UnitsSelector=__webpack_require__("./src/ShoppingList/ItemList/UnitsSelector/index.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");var EditItemForm=function EditItemFormConstructor(saveShoppingListItem){return function EditItemForm(_ref){var _item$quantity,_item$quantity2,item=_ref.item,onSave=_ref.onSave,_useState=(0,react.useState)(item.name),_useState2=(0,slicedToArray.Z)(_useState,2),itemName=_useState2[0],setItemName=_useState2[1],_useState3=(0,react.useState)((null===(_item$quantity=item.quantity)||void 0===_item$quantity?void 0:_item$quantity.scalar.toString())||""),_useState4=(0,slicedToArray.Z)(_useState3,2),itemQuantityScalar=_useState4[0],setQuantityScalar=_useState4[1],_useState5=(0,react.useState)(null===(_item$quantity2=item.quantity)||void 0===_item$quantity2?void 0:_item$quantity2.units),_useState6=(0,slicedToArray.Z)(_useState5,2),itemQuantityUnits=_useState6[0],setQuantityUnits=_useState6[1];return(0,jsx_runtime.jsxs)(Form.Z,{children:[(0,jsx_runtime.jsx)(Form.Z.Field,{children:(0,jsx_runtime.jsxs)("label",{children:["Name",(0,jsx_runtime.jsx)(Input.Z,{value:itemName,onChange:function onChange(_ref2){var target=_ref2.target;return setItemName(target.value)}})]})}),(0,jsx_runtime.jsxs)(Form.Z.Group,{inline:!0,children:[(0,jsx_runtime.jsx)(Form.Z.Field,{children:(0,jsx_runtime.jsxs)("label",{children:["Quantity",(0,jsx_runtime.jsx)(Input.Z,{value:itemQuantityScalar,onChange:function onChange(_ref3){var target=_ref3.target;return setQuantityScalar(target.value)},style:{paddingLeft:"1em"}})]})}),(0,jsx_runtime.jsx)(Form.Z.Field,{children:(0,jsx_runtime.jsx)(UnitsSelector.Z,{value:itemQuantityUnits,onChange:setQuantityUnits})})]}),(0,jsx_runtime.jsx)(Button.Z,{type:"submit",onClick:(0,asyncToGenerator.Z)(regenerator_default().mark((function _callee(){var updatedItem,scalar;return regenerator_default().wrap((function _callee$(_context){for(;;)switch(_context.prev=_context.next){case 0:return updatedItem=(0,objectSpread2.Z)((0,objectSpread2.Z)({},item),{},{name:itemName}),scalar=Number.parseInt(itemQuantityScalar),updatedItem.quantity=scalar?{scalar:scalar,units:itemQuantityUnits||null}:null,_context.next=5,saveShoppingListItem(updatedItem);case 5:onSave();case 6:case"end":return _context.stop()}}),_callee)}))),children:"Save"})]})}},ShoppingListItem=__webpack_require__("./src/factories/ShoppingListItem.ts"),index_stories_EditItemForm=EditItemForm((function(item){return(0,esm.action)("updateItem")(item),Promise.resolve(100)})),item=ShoppingListItem.Z.build({name:"Grapes"}),index_stories={title:"ItemList/EditItemForm",component:index_stories_EditItemForm},Example=function Example(){return(0,jsx_runtime.jsx)(index_stories_EditItemForm,{item:item,onSave:(0,esm.action)("onSave")})},__namedExportsOrder=["Example"]},"./src/ShoppingList/ItemList/UnitsSelector/index.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Selector:function(){return Selector},__namedExportsOrder:function(){return __namedExportsOrder}});var ___WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/ShoppingList/ItemList/UnitsSelector/index.tsx"),_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/addon-actions/dist/esm/index.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js"),UnitsSelectorStories={title:"ItemList/UnitsSelector",component:___WEBPACK_IMPORTED_MODULE_0__.Z};__webpack_exports__.default=UnitsSelectorStories;var Selector=function Selector(){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Z,{onChange:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.action)("onChange")})},__namedExportsOrder=["Selector"]},"./src/ShoppingList/ItemList/UnitsSelector/index.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";var _home_runner_work_shopping_list_shopping_list_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/semantic-ui-react/dist/es/addons/Select/Select.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),options=[{text:"Units",value:"units"},{text:"ml",value:"ml"},{text:"l",value:"l"},{text:"g",value:"g"},{text:"kg",value:"kg"}];__webpack_exports__.Z=function UnitsSelector(_ref){var value=_ref.value,onChange=_ref.onChange,selectProps={options:options};return value?selectProps.value=value:selectProps.defaultValue="units",onChange&&(selectProps.onChange=function(_,_ref2){var value=_ref2.value;onChange("units"===value?void 0:value)}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__.Z,(0,_home_runner_work_shopping_list_shopping_list_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_2__.Z)({},selectProps))}},"./src/ShoppingList/ItemList/index.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Loading:function(){return Loading},WithItems:function(){return WithItems},WithoutItems:function(){return WithoutItems},__namedExportsOrder:function(){return __namedExportsOrder},default:function(){return index_stories}});var slicedToArray=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),react=__webpack_require__("./node_modules/react/index.js"),Segment=__webpack_require__("./node_modules/semantic-ui-react/dist/es/elements/Segment/Segment.js"),Dimmer=__webpack_require__("./node_modules/semantic-ui-react/dist/es/modules/Dimmer/Dimmer.js"),Loader=__webpack_require__("./node_modules/semantic-ui-react/dist/es/elements/Loader/Loader.js"),Header=__webpack_require__("./node_modules/semantic-ui-react/dist/es/elements/Header/Header.js"),Icon=__webpack_require__("./node_modules/semantic-ui-react/dist/es/elements/Icon/Icon.js"),Button=__webpack_require__("./node_modules/semantic-ui-react/dist/es/elements/Button/Button.js"),Label=__webpack_require__("./node_modules/semantic-ui-react/dist/es/elements/Label/Label.js"),src_useService=__webpack_require__("./src/useService.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");var ItemList=function ItemListConstructor(listShoppingListItems,buyItemOnShoppingList,EditItemForm){var useService=(0,src_useService.Z)(listShoppingListItems);return function ItemList(_ref){var shoppingList=_ref.shoppingList,_useService2=useService([],shoppingList),_useService3=(0,slicedToArray.Z)(_useService2,3),isLoading=_useService3[0],fetchError=_useService3[1],shoppingListItems=_useService3[2];return fetchError?(0,jsx_runtime.jsxs)("p",{children:["Error: ",fetchError.message]}):isLoading?(0,jsx_runtime.jsx)(Segment.Z,{placeholder:!0,children:(0,jsx_runtime.jsx)(Dimmer.Z,{active:!0,inverted:!0,children:(0,jsx_runtime.jsxs)(Loader.Z,{inverted:!0,children:["Loading ",shoppingList.name," items."]})})}):0===shoppingListItems.length?(0,jsx_runtime.jsx)(Segment.Z,{placeholder:!0,children:(0,jsx_runtime.jsxs)(Header.Z,{icon:!0,children:[(0,jsx_runtime.jsx)(Icon.Z,{name:"shopping basket"}),"No items in ",shoppingList.name,"."]})}):(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[" ",shoppingListItems.map((function(item){return(0,jsx_runtime.jsx)(Segment.Z,{clearing:!0,children:(0,jsx_runtime.jsx)(ListItem,{item:item})},item.id)}))," "]})};function ListItem(_ref2){var item=_ref2.item,_useState=(0,react.useState)(!1),_useState2=(0,slicedToArray.Z)(_useState,2),isEditing=_useState2[0],setIsEditing=_useState2[1];return isEditing?(0,jsx_runtime.jsx)(EditItemForm,{item:item,onSave:function onSave(){return setIsEditing(!1)}}):(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[item.name," ",quantity(item),(0,jsx_runtime.jsx)(Button.Z,{floated:"right",size:"mini",onClick:function onClick(){return buyItemOnShoppingList(item)},children:"Buy"}),(0,jsx_runtime.jsx)(Button.Z,{floated:"right",size:"mini",onClick:function onClick(){return setIsEditing(!0)},children:"Edit"})]})}function quantity(item){var _item$quantity,_item$quantity2;if(item.quantity)return(0,jsx_runtime.jsxs)(Label.Z,{circular:!0,style:{marginLeft:"1em"},children:[null===(_item$quantity=item.quantity)||void 0===_item$quantity?void 0:_item$quantity.scalar,null===(_item$quantity2=item.quantity)||void 0===_item$quantity2?void 0:_item$quantity2.units]})}},esm=__webpack_require__("./node_modules/@storybook/addon-actions/dist/esm/index.js"),ShoppingList=__webpack_require__("./src/factories/ShoppingList.ts"),ShoppingListItem=__webpack_require__("./src/factories/ShoppingListItem.ts"),EditItemForm=function EditItemForm(_ref){var onSave=_ref.onSave;return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:["Edit Form",(0,jsx_runtime.jsx)(Button.Z,{floated:"right",size:"mini",onClick:onSave,children:"Close"})]})},index_stories_ItemList=ItemList((function(list,onUpdate,onError){return onUpdate([ShoppingListItem.Z.build({name:"Pickles",list:list}),ShoppingListItem.Z.build({name:"Cream soda",list:list,quantity:{scalar:12}}),ShoppingListItem.Z.build({name:"Cream",list:list,id:"cream",quantity:{scalar:150,units:"ml"}})]),function(){}}),(0,esm.action)("deleteItem"),EditItemForm),shoppingList=ShoppingList.Z.build(),index_stories={title:"ItemList",component:index_stories_ItemList},WithItems=function WithItems(){return(0,jsx_runtime.jsx)(Segment.Z.Group,{children:(0,jsx_runtime.jsx)(index_stories_ItemList,{shoppingList:shoppingList})})},ItemListWithoutItems=ItemList((function(list,onUpdate,onError){return onUpdate([]),function(){}}),(0,esm.action)("deleteItem"),EditItemForm),WithoutItems=function WithoutItems(){return(0,jsx_runtime.jsx)(ItemListWithoutItems,{shoppingList:shoppingList})},ItemListLoading=ItemList((function(list,onUpdate,onError){return function(){}}),(0,esm.action)("deleteItem"),EditItemForm),Loading=function Loading(){return(0,jsx_runtime.jsx)(ItemListLoading,{shoppingList:shoppingList})},__namedExportsOrder=["WithItems","WithoutItems","Loading"]},"./src/factories/ShoppingList.ts":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";var factory_ts__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/factory.ts/lib/index.js"),ShoppingListFactory=factory_ts__WEBPACK_IMPORTED_MODULE_0__.fo.makeFactory({id:factory_ts__WEBPACK_IMPORTED_MODULE_0__.S6((function(i){return i.toString()})),name:"List o Shopping",owner_uids:["bob"]});__webpack_exports__.Z=ShoppingListFactory},"./src/factories/ShoppingListItem.ts":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";var factory_ts__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/factory.ts/lib/index.js"),_ShoppingList__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/factories/ShoppingList.ts"),ShoppingListItemFactory=factory_ts__WEBPACK_IMPORTED_MODULE_0__.fo.makeFactory({id:factory_ts__WEBPACK_IMPORTED_MODULE_0__.S6((function(i){return i.toString()})),name:"Bacon",list:_ShoppingList__WEBPACK_IMPORTED_MODULE_1__.Z.build(),has_been_bought:!1,added_to_list_on:new Date,quantity:null});__webpack_exports__.Z=ShoppingListItemFactory},"./src/useService.ts":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";var _home_runner_work_shopping_list_shopping_list_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");__webpack_exports__.Z=function _useService(service){return function useService(initialState,request){var _useState=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!0),_useState2=(0,_home_runner_work_shopping_list_shopping_list_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_1__.Z)(_useState,2),isLoading=_useState2[0],setIsLoading=_useState2[1],_useState3=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),_useState4=(0,_home_runner_work_shopping_list_shopping_list_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_1__.Z)(_useState3,2),fetchErrored=_useState4[0],setFetchError=_useState4[1],_useState5=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialState),_useState6=(0,_home_runner_work_shopping_list_shopping_list_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_1__.Z)(_useState5,2),fetchedData=_useState6[0],setFetchedData=_useState6[1];return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){return service(request,(function(fetchedData){setIsLoading(!1),setFetchedData(fetchedData)}),(function(error){setIsLoading(!1),setFetchError(error)}))}),[request]),[isLoading,fetchErrored,fetchedData]}}},"./src sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.tsx)$":function(module,__unused_webpack_exports,__webpack_require__){var map={"./AlphaBanner/index.stories.tsx":"./src/AlphaBanner/index.stories.tsx","./CreateShoppingListForm/index.stories.tsx":"./src/CreateShoppingListForm/index.stories.tsx","./ListSelector/index.stories.tsx":"./src/ListSelector/index.stories.tsx","./Login/index.stories.tsx":"./src/Login/index.stories.tsx","./ShoppingList/AddItemForm/index.stories.tsx":"./src/ShoppingList/AddItemForm/index.stories.tsx","./ShoppingList/EventLogViewer/index.stories.tsx":"./src/ShoppingList/EventLogViewer/index.stories.tsx","./ShoppingList/ItemList/EditItemForm/index.stories.tsx":"./src/ShoppingList/ItemList/EditItemForm/index.stories.tsx","./ShoppingList/ItemList/UnitsSelector/index.stories.tsx":"./src/ShoppingList/ItemList/UnitsSelector/index.stories.tsx","./ShoppingList/ItemList/index.stories.tsx":"./src/ShoppingList/ItemList/index.stories.tsx"};function webpackContext(req){var id=webpackContextResolve(req);return __webpack_require__(id)}function webpackContextResolve(req){if(!__webpack_require__.o(map,req)){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}return map[req]}webpackContext.keys=function webpackContextKeys(){return Object.keys(map)},webpackContext.resolve=webpackContextResolve,module.exports=webpackContext,webpackContext.id="./src sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.tsx)$"},"./storybook-init-framework-entry.js":function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){"use strict";__webpack_require__("./node_modules/@storybook/react/dist/esm/client/index.js")},"?4f7e":function(){},"?b1b0":function(){},"./generated-stories-entry.cjs":function(module,__unused_webpack_exports,__webpack_require__){"use strict";module=__webpack_require__.nmd(module),(0,__webpack_require__("./node_modules/@storybook/react/dist/esm/client/index.js").configure)([__webpack_require__("./src sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.tsx)$")],module,!1)}},function(__webpack_require__){var __webpack_exec__=function(moduleId){return __webpack_require__(__webpack_require__.s=moduleId)};__webpack_require__.O(0,[33],(function(){return __webpack_exec__("./node_modules/@storybook/core-client/dist/esm/globals/polyfills.js"),__webpack_exec__("./node_modules/@storybook/core-client/dist/esm/globals/globals.js"),__webpack_exec__("./storybook-init-framework-entry.js"),__webpack_exec__("./node_modules/@storybook/react/dist/esm/client/preview/config-generated-config-entry.js"),__webpack_exec__("./node_modules/@storybook/addon-actions/preview.js-generated-config-entry.js"),__webpack_exec__("./node_modules/@storybook/addon-a11y/preview.js-generated-config-entry.js"),__webpack_exec__("./generated-stories-entry.cjs")}));__webpack_require__.O()}]);