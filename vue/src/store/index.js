import axios from "axios";
import { createStore } from "vuex";
import axiosClient from "../axios";

const store = createStore({
    state: {
        user: {
            data: {
                name: sessionStorage.getItem('name'),
                email: null,
                password: null,
                password_confirmation: null,
                id: null,
                created_at: null,
                updated_at: null,
            },
            token: sessionStorage.getItem('TOKEN') //for still data when user reloading the page
        },
        dashboard: {
            loading: false,
            data: {}
        },
        currentSurvey: {
            loading: false,
            data: {

            }
        },
        surveys: {
            loading: false,
            links: [],
            data: [],
        },
        notification: {
            show: false,
            type: null,
            message: null,
        },
        questionTypes: ["text", "select", "radio", "checkbox", "textarea"],
    },
    getters: {
        getData(state) {
            return state.user.data.name;
        },
        getToken(state) {
            return state.user.token;
        }
    },
    mutations: {
        //examples
        //is sync
        //it invoke with store.commit('increment')
        changeName(state, obj) {
            state.user.data.name = obj.new_name;
        },
        //accual
        logout: state => {
            console.log("aloshe logout");
            state.user.data = {};
            state.user.token = null;
            sessionStorage.removeItem("TOKEN");
            sessionStorage.removeItem("name");
        },
        setUser: (state, userDataRes) => {
            //console.log("HELLO", userDataRes.data.token);
            state.user.token = userDataRes.token;
            state.user.data = userDataRes.data;
            sessionStorage.setItem("name", userDataRes.data.user.name);
            sessionStorage.setItem("TOKEN", userDataRes.data.token); //save token that comes from backend in a session storage
        },
        setCurrentSurvey(state, survey) {
            state.currentSurvey.data = survey.data;
        },
        setCurrentSurveyLoading(state, loading) {
            state.currentSurvey.loading = loading;
        },
        setSurveys(state, surveys) {
            //debugger;
            state.surveys.links = surveys.meta.links;
            state.surveys.data = surveys.data;
        },
        setSurveysLoading(state, loading) {
            state.surveys.loading = loading;
        },
        notify: (state, { message, type }) => {
            state.notification.show = true;
            state.notification.type = type;
            state.notification.message = message;
            setTimeout(() => {
                state.notification.show = false;
            }, 4000);
        },
        dashboardLoading(state, loading) {
            state.dashboard.loading = loading;
        },
        setDashboardData(state, data) {
            state.dashboard.data = data;
        }
    },
    actions: {
        //is async it invoke maybe some of actions or mutations via({commit})
        //it for action increment1 deside to invoke the action increment2 that is done via store.dispatch('increment2')
        changeName1({ commit }) {
            commit('changeName', { new_name: "wael" });
        },
        async register({ commit }, user) {
            return await axiosClient.post('/store', user)
                .then((res) => {
                    commit("setUser", res);
                    return res; //to then in register component
                });
        },
        async login({ commit }, user) {
            return await axiosClient.post('/login', user)
                .then((res) => {
                    commit("setUser", res);
                    return res;
                });
        },
        async logout({ commit }) {
            await axiosClient.post('/logout')
                .then((response) => {
                    console.log("in store", response);
                    commit('logout');
                    //return response;
                }).catch((err) => console.log(err))
        },
        saveSurvey({ commit }, survey) {
            delete survey.image_url; //prevent image_url to send to backend via axios
            let response;
            if (survey.id /* OR survey.hasOwnProperty('id')*/ ) {
                //update an existant survey
                response = axiosClient
                    .put(`/survey/${survey.id}`, survey)
                    .then((res) => {
                        //commit("updateSurvey", res.data);
                        commit("setCurrentSurvey", res.data);
                        return res.data.data.id;
                    });
            } else {
                //create an survey
                response = axiosClient.post("/survey", survey)
                    .then((res) => {
                        //commit("saveSurvey", res.data);
                        commit("setCurrentSurvey", res.data);
                        console.log(res.data);
                        return res.data.data.id;
                    });
            }
            return response;
        },
        getSurvey({ commit }, id) {
            console.log("LOADING ....");
            commit("setCurrentSurveyLoading", true);
            return axiosClient.get(`/survey/${id}`)
                .then((res) => {
                    console.log("getSurvey", res);
                    commit("setCurrentSurvey", res.data);
                    commit("setCurrentSurveyLoading", false);
                    return res;
                }).catch((err) => {
                    console.log("err", err);
                    commit("setCurrentSurveyLoading", false);
                    throw err;
                });
        },
        deleteSurvey({}, id) {
            return axiosClient.delete(`/survey/${id}`);
        },
        getSurveys({ commit }, { url = null } = {}) {
            url = url || '/survey';
            commit('setSurveysLoading', true);
            return axiosClient.get(url).then((res) => {
                commit('setSurveysLoading', false);
                commit('setSurveys', res.data);
                console.log(res.data.data);
                return res;
            });
        },
        getSurveyBySlug({ commit }, slug) {
            console.log(slug);
            commit('setCurrentSurveyLoading', true);
            return axiosClient.get(`/survey-by-slug/${slug}`)
                .then((res) => {
                    commit('setCurrentSurvey', res.data);
                    commit('setCurrentSurveyLoading', false);
                    return res;
                }).catch((error) => {
                    commit('setCurrentSurveyLoading', false);
                    //debugger;
                    throw error;
                });
        },
        saveSurveyAnswer({ commit }, { surveyId, answers }) {
            return axiosClient.post(`/survey/${surveyId}/answer`, { answers });
        },
        getDashboardData({ commit }) {
            commit('dashboardLoading', true);
            return axiosClient.get("/dashboard")
                .then((res) => {
                    commit('dashboardLoading', false);
                    commit('setDashboardData', res.data);
                    return res;
                }).catch((error) => {
                    commit('dashboardLoading', false);
                    return error;
                });

        }

    },
    modules: {

    }
});

export default store;