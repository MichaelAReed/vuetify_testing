import Vue from 'vue';
import Router from 'vue-router';

////////////////////////////////////////////////////////////////
//////////////////////// VIEW IMPORTS //////////////////////////
////////////////////////////////////////////////////////////////
import Home from '@/views/Home.vue';
import Profile from '@/views/Profile.vue';
import BookRoom from '@/views/BookRoom.vue';

import Login from '@/views/Login.vue';
import SignUp from '@/views/SignUp.vue';

import AuthGuard from '@/router/AuthGuard';

// Page imports for Supplier schema.
import Suppliers from '@/structures/supplier/Suppliers.vue';
import NewSupplier from '@/structures/supplier/NewSupplier.vue';
import Supplier from '@/structures/supplier/Supplier.vue';

// Page imports for User schema.
import Users from '@/structures/user/Users';
import NewUser from '@/structures/user/NewUser';
import User from '@/structures/user/User';
import NewMattermostUser from '@/structures/user/NewMattermostUser';

// Page imports for Team schema.
import Teams from '@/structures/team/Teams';
import NewTeam from '@/structures/team/NewTeam';
import Team from '@/structures/team/Team';

// Page imports for ToolType schema.
import ToolTypes from '@/structures/toolType/ToolTypes';
import NewToolType from '@/structures/toolType/NewToolType';
import ToolType from '@/structures/toolType/ToolType';

// Page imports for Tool schema.
import NewTool from '@/structures/tool/NewTool';
import Tool from '@/structures/tool/Tool';

Vue.use(Router);

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
// 			path: '/home',
			name: 'home',
			component: Home
		},
		{
			path: '/profile',
			name: 'profile',
			component: Profile,
			beforeEnter: AuthGuard
		},
		{
			path: '/login',
			name: 'login',
			component: Login
		},
		{
			path: '/signup',
			name: 'signup',
			component: SignUp
		},
		{
			path: '/bookroom',
			name: 'bookRoom',
			component: BookRoom
		},
		{
			path: '/suppliers',
			name: 'suppliers',
			component: Suppliers,
			beforeEnter: AuthGuard
		},
		{
			path: '/suppliers/new',
			name: 'newSupplier',
			component: NewSupplier,
			beforeEnter: AuthGuard
		},
		{
			path: '/suppliers/:id',
			name: 'supplier',
			props: true,
			component: Supplier,
			beforeEnter: AuthGuard
		},
		{
			path: '/users',
			name: 'users',
			component: Users,
			beforeEnter: AuthGuard
		},
		{
			path: '/users/newMattermostUser',
// 			path: '/',
			name: 'newMattermostUser',
			component: NewMattermostUser
		},
		{
			path: '/users/new/:teamID?',
			name: 'newUser',
			props: true,
			component: NewUser,
			beforeEnter: AuthGuard
		},
		{
			path: '/users/:id',
			name: 'user',
			props: true,
			component: User,
			beforeEnter: AuthGuard
		},
		{
			path: '/teams',
			name: 'teams',
			component: Teams,
			beforeEnter: AuthGuard
		},
		{
			path: '/teams/new',
			name: 'newTeam',
			component: NewTeam,
			beforeEnter: AuthGuard
		},
		{
			path: '/teams/:id',
			name: 'team',
			props: true,
			component: Team,
			beforeEnter: AuthGuard
		},
		{
			path: '/tools',
			name: 'tools',
			component: ToolTypes,
			beforeEnter: AuthGuard
		},
		{
			path: '/toolTypes',
			name: 'toolTypes',
			component: ToolTypes,
			beforeEnter: AuthGuard
		},
		{
			path: '/toolTypes/new',
			name: 'newToolType',
			component: NewToolType,
			beforeEnter: AuthGuard
		},
		{
			path: '/toolTypes/:id',
			name: 'toolType',
			props: true,
			component: ToolType,
			beforeEnter: AuthGuard
		},
		{
			path: '/tools/new/:toolTypeID?',
			name: 'newTool',
			props: true,
			component: NewTool,
			beforeEnter: AuthGuard
		},
		{
			path: '/tools/:id',
			name: 'tool',
			props: true,
			component: Tool,
			beforeEnter: AuthGuard
		}

		//     {
		//       path: "/about",
		//       name: "about",
		//       // route level code-splitting
		//       // this generates a separate chunk (about.[hash].js) for this route
		//       // which is lazy-loaded when the route is visited.
		//       component: () =>
		//         import(/* webpackChunkName: "about" */ "./views/About.vue")
		//     }
	]
});
