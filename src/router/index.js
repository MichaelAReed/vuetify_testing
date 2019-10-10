import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import Profile from '@/views/Profile.vue';
import Login from '@/views/Login.vue';
import SignUp from '@/views/SignUp.vue';
import People from '@/views/People.vue';
import BookRoom from '@/views/BookRoom.vue';
import Suppliers from '@/views/Suppliers.vue';
import NewSupplier from '@/views/NewSupplier.vue';
import Supplier from '@/views/Supplier.vue';
import Tools from '@/views/Tools.vue';
import AuthGuard from '@/router/AuthGuard';
import NewUser from '@/structures/user/NewUser';
import Users from '@/structures/user/Users';
import User from '@/structures/user/User';
import Teams from '@/structures/team/Teams';
import NewTeam from '@/structures/team/NewTeam';
import Team from '@/structures/team/Team';

Vue.use(Router);

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
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
			path: '/people',
			name: 'people',
			component: People
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
			path: '/tools',
			name: 'tools',
			component: Tools
		},
		{
			path: '/users',
			name: 'Users',
			component: Users,
			beforeEnter: AuthGuard
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
			name: 'Teams',
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
