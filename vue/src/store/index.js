import axios from "axios";
import { createStore } from "vuex";
import axiosClient from "../axios";
const tmpSurveys = [{
    id: 100,
    title: "servey 1",
    slug: "slug 1",
    status: "status 1",
    image: "https://via.placeholder.com/728x90.png",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat nemo ipsam magnam voluptatem repellendus id rem molestiae dolorum deserunt placeat aperiam voluptate obcaecati incidunt voluptates temporibus ducimus, corrupti delectus voluptatum?    ",
    created_at: "2022-09-10 12:21:23",
    updated_at: "2022-11-03 11:23:23",
    expire_date: "2022-09-12 10:43:23",
    questions: [{
        id: 1,
        type: "select",
        question: "From which you are ?",
        description: "ds",
        data: {
            options: [{
                uuid: "dasfsdftnq2eRwB.lq8JPAMn9gIhjrGmR5jyQs3KaGS",
                text: "USA"
            }, {
                uuid: "$2y$10$f/sdgd.jyuk",
                text: "Georgia"
            }, {
                uuid: "$$2y$10$6nXov8BW4J29TfKXMExAXewf2vixaIHNHbOLFgEkuoezLDFIuZbb6$10$/.lq8JPAMn9gIhjrGmR5jyQs3KaGS",
                text: "syria"
            }, {
                uuid: "10$M46qYAWnY6fK/xUdatnq2eRwB.$2y$10$6nXov8BW4J29TfKXMExAXewf2vixaIHNHbOLFgEkuoezLDFIuZbb6",
                text: "RFA"
            }, {
                uuid: "$sdg$10$sdfsdf/xsgUdatnq2eRwB.$2y$10$6nXov8BW4J29TfKXMExAXewf2vixaIHNHbOLFgEkuoezLDFIuZbb6",
                text: "TPO"
            }, {
                uuid: "$sdf$10$sdf/xUdatnq2eRwB.lq8JPAMn9gIhjrGmR5jyQs3KaGS",
                text: "BZM"
            }]
        }
    }, {
        id: 2,
        type: "checkbox",
        question: "How are you ?",
        description: "So I don't get it, is this a laravel 5.3 bug or something? This is my php artisan route list",
        data: {
            options: [{
                uuid: "pii676.lq8JPAMn9gIhjrGmR5jyQs3KaGS",
                text: "laravel 5"
            }, {
                uuid: "$yuiyu$10$f/sdgd.jyuk",
                text: "laravel 6"
            }, {
                uuid: "7896nXov8BW4J29TfKXMExAXewf2vixaIHNHbOLFgEkuoezLDFIuZbb6$10$/.lq8JPAMn9gIhjrGmR5jyQs3KaGS",
                text: "laravel 7"
            }, {
                uuid: "10$678/xUdatnq2eRwB.$2y$70$6nXov8BW4J29TfKXMExAXewf2vixaIHNHbOLFgEkuoezLDFIuZbb6",
                text: "laravel 8"
            }, {
                uuid: "$678$10$457/69.$2y$10$6nXov8BW4J29TfKXMExAXewf2vixaIHNHbOLFgEkuoezLDFIuZbb6",
                text: "laravel 9"
            }, {
                uuid: "567PAMn9gIhjrGmR5jyQs3KaGS",
                text: "TypeScript"
            }]
        }
    }, {
        id: 3,
        type: "checkbox",
        question: "where are you ?",
        description: "Display - Tailwind CSS, Layout, Display, Utilities for controlling the display box type of an element. Basic usage, Block & Inline, Use inline, inline-block, and block to control the flow of text and elements. When controlling the flow of text, using the CSS property display: inline will cause",
        data: {
            options: [{
                uuid: "dasfsdftnq2eRwB.lq8JPAMn9gIhjrGmR5jyQs3KaGS",
                text: "tailwindcss"
            }, {
                uuid: "$2y$10$f/sdgd.jyuk",
                text: "java"
            }, {
                uuid: "$$2y$10$6nXov8BW4J29TfKXMExAXewf2vixaIHNHbOLFgEkuoezLDFIuZbb6$10$/.lq8JPAMn9gIhjrGmR5jyQs3KaGS",
                text: "c++"
            }, {
                uuid: "10$M46qYAWnY6fK/xUdatnq2eRwB.$2y$10$6nXov8BW4J29TfKXMExAXewf2vixaIHNHbOLFgEkuoezLDFIuZbb6",
                text: "HTML"
            }, {
                uuid: "$sdg$10$sdfsdf/xsgUdatnq2eRwB.$2y$10$6nXov8BW4J29TfKXMExAXewf2vixaIHNHbOLFgEkuoezLDFIuZbb6",
                text: "XML"
            }, {
                uuid: "$sdf$10$sdf/xUdatnq2eRwB.lq8JPAMn9gIhjrGmR5jyQs3KaGS",
                text: "PHP"
            }]
        }
    }, {
        id: 4,
        type: "seclect",
        question: "what is the favorite hoppy ?",
        description: "So I don't get it, is this a laravel 5.3 bug or something? This is my php artisan route list",
        data: {
            options: [{
                uuid: "pii676.lq8JPAMn9gIhjrGmR5jyQs3KaGS",
                text: "Audi"
            }, {
                uuid: "$yuiyu$10$f/sdgd.jyuk",
                text: "Kia"
            }, {
                uuid: "7896nXov8BW4J29TfKXMExAXewf2vixaIHNHbOLFgEkuoezLDFIuZbb6$10$/.lq8JPAMn9gIhjrGmR5jyQs3KaGS",
                text: "Saba"
            }, {
                uuid: "10$678/xUdatnq2eRwB.$2y$70$6nXov8BW4J29TfKXMExAXewf2vixaIHNHbOLFgEkuoezLDFIuZbb6",
                text: "Toyota"
            }, {
                uuid: "$678$10$457/69.$2y$10$6nXov8BW4J29TfKXMExAXewf2vixaIHNHbOLFgEkuoezLDFIuZbb6",
                text: "BMW"
            }, {
                uuid: "567PAMn9gIhjrGmR5jyQs3KaGS",
                text: "Mercides"
            }]
        }
    }, {
        id: 5,
        type: "text",
        question: "what's your favourite youtube channel ?",
        description: "Display - Tailwind CSS, Layout, Display, Utilities for controlling the display box type of an element. Basic usage, Block & Inline, Use inline, inline-block, and block to control the flow of text and elements. When controlling the flow of text, using the CSS property display: inline will cause",
        data: {}
    }, {
        id: 6,
        type: "textarea",
        question: "what's do yo think about w3c youtube channel ?",
        description: "write your honest option. Everything is anonymous",
        data: {}
    }],
}, {
    id: 101,
    title: "servey 2",
    slug: "slug 2",
    status: "status 2",
    image: "https://via.placeholder.com/728x90.png",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat nemo ipsam magnam voluptatem repellendus id rem molestiae dolorum deserunt placeat aperiam voluptate obcaecati incidunt voluptates temporibus ducimus, corrupti delectus voluptatum?    ",
    created_at: "2022-09-10 12:21:23",
    updated_at: "2022-11-03 11:23:23",
    expire_date: "2022-09-12 10:43:23",
    questions: [{
        id: 1,
        type: "select",
        question: "From which you are ?",
        description: null,
        data: {
            options: [{
                uuid: "dasfsdftnq2eRwB.lq8JPAMn9gIhjrGmR5jyQs3KaGS",
                text: "USA"
            }, {
                uuid: "$2y$10$f/sdgd.jyuk",
                text: "Georgia"
            }, {
                uuid: "$$2y$10$6nXov8BW4J29TfKXMExAXewf2vixaIHNHbOLFgEkuoezLDFIuZbb6$10$/.lq8JPAMn9gIhjrGmR5jyQs3KaGS",
                text: "syria"
            }, {
                uuid: "10$M46qYAWnY6fK/xUdatnq2eRwB.$2y$10$6nXov8BW4J29TfKXMExAXewf2vixaIHNHbOLFgEkuoezLDFIuZbb6",
                text: "RFA"
            }, {
                uuid: "$sdg$10$sdfsdf/xsgUdatnq2eRwB.$2y$10$6nXov8BW4J29TfKXMExAXewf2vixaIHNHbOLFgEkuoezLDFIuZbb6",
                text: "TPO"
            }, {
                uuid: "$sdf$10$sdf/xUdatnq2eRwB.lq8JPAMn9gIhjrGmR5jyQs3KaGS",
                text: "BZM"
            }]
        }
    }, {
        id: 2,
        type: "checkbox",
        question: "How are you ?",
        description: "So I don't get it, is this a laravel 5.3 bug or something? This is my php artisan route list",
        data: {
            options: [{
                uuid: "pii676.lq8JPAMn9gIhjrGmR5jyQs3KaGS",
                text: "laravel 5"
            }, {
                uuid: "$yuiyu$10$f/sdgd.jyuk",
                text: "laravel 6"
            }, {
                uuid: "7896nXov8BW4J29TfKXMExAXewf2vixaIHNHbOLFgEkuoezLDFIuZbb6$10$/.lq8JPAMn9gIhjrGmR5jyQs3KaGS",
                text: "laravel 7"
            }, {
                uuid: "10$678/xUdatnq2eRwB.$2y$70$6nXov8BW4J29TfKXMExAXewf2vixaIHNHbOLFgEkuoezLDFIuZbb6",
                text: "laravel 8"
            }, {
                uuid: "$678$10$457/69.$2y$10$6nXov8BW4J29TfKXMExAXewf2vixaIHNHbOLFgEkuoezLDFIuZbb6",
                text: "laravel 9"
            }, {
                uuid: "567PAMn9gIhjrGmR5jyQs3KaGS",
                text: "TypeScript"
            }]
        }
    }, {
        id: 3,
        type: "checkbox",
        question: "where are you ?",
        description: "Display - Tailwind CSS, Layout, Display, Utilities for controlling the display box type of an element. Basic usage, Block & Inline, Use inline, inline-block, and block to control the flow of text and elements. When controlling the flow of text, using the CSS property display: inline will cause",
        data: {
            options: [{
                uuid: "dasfsdftnq2eRwB.lq8JPAMn9gIhjrGmR5jyQs3KaGS",
                text: "tailwindcss"
            }, {
                uuid: "$2y$10$f/sdgd.jyuk",
                text: "java"
            }, {
                uuid: "$$2y$10$6nXov8BW4J29TfKXMExAXewf2vixaIHNHbOLFgEkuoezLDFIuZbb6$10$/.lq8JPAMn9gIhjrGmR5jyQs3KaGS",
                text: "c++"
            }, {
                uuid: "10$M46qYAWnY6fK/xUdatnq2eRwB.$2y$10$6nXov8BW4J29TfKXMExAXewf2vixaIHNHbOLFgEkuoezLDFIuZbb6",
                text: "HTML"
            }, {
                uuid: "$sdg$10$sdfsdf/xsgUdatnq2eRwB.$2y$10$6nXov8BW4J29TfKXMExAXewf2vixaIHNHbOLFgEkuoezLDFIuZbb6",
                text: "XML"
            }, {
                uuid: "$sdf$10$sdf/xUdatnq2eRwB.lq8JPAMn9gIhjrGmR5jyQs3KaGS",
                text: "PHP"
            }]
        }
    }, {
        id: 4,
        type: "seclect",
        question: "what is the favorite hoppy ?",
        description: "So I don't get it, is this a laravel 5.3 bug or something? This is my php artisan route list",
        data: {
            options: [{
                uuid: "pii676.lq8JPAMn9gIhjrGmR5jyQs3KaGS",
                text: "Audi"
            }, {
                uuid: "$yuiyu$10$f/sdgd.jyuk",
                text: "Kia"
            }, {
                uuid: "7896nXov8BW4J29TfKXMExAXewf2vixaIHNHbOLFgEkuoezLDFIuZbb6$10$/.lq8JPAMn9gIhjrGmR5jyQs3KaGS",
                text: "Saba"
            }, {
                uuid: "10$678/xUdatnq2eRwB.$2y$70$6nXov8BW4J29TfKXMExAXewf2vixaIHNHbOLFgEkuoezLDFIuZbb6",
                text: "Toyota"
            }, {
                uuid: "$678$10$457/69.$2y$10$6nXov8BW4J29TfKXMExAXewf2vixaIHNHbOLFgEkuoezLDFIuZbb6",
                text: "BMW"
            }, {
                uuid: "567PAMn9gIhjrGmR5jyQs3KaGS",
                text: "Mercides"
            }]
        }
    }, {
        id: 5,
        type: "text",
        question: "what's your favourite youtube channel ?",
        description: "Display - Tailwind CSS, Layout, Display, Utilities for controlling the display box type of an element. Basic usage, Block & Inline, Use inline, inline-block, and block to control the flow of text and elements. When controlling the flow of text, using the CSS property display: inline will cause",
        data: {}
    }, {
        id: 6,
        type: "textarea",
        question: "what's do yo think about w3c youtube channel ?",
        description: "write your honest option. Everything is anonymous",
        data: {}
    }],
}];
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
        currentSurvey: {
            loading: false,
            data: {

            }
        },
        surveys: [...tmpSurveys],
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
        // saveSurvey(state, survey) {
        //     state.surveys = [...state.surveys, survey.data];
        //     console.log(state.surveys);

        // },
        // updateSurvey(state, survey) {
        //     console.log(survey);
        //     state.surveys = state.surveys.map((sur) => {
        //         if (sur.id == survey.data.id) {
        //             return survey.data;
        //         }
        //         return sur;
        //     });
        // },
        setCurrentSurvey(state, survey) {
            state.currentSurvey.data = survey.data;
        },
        setCurrentSurveyLoading(state, loading) {
            state.currentSurvey.loading = loading;
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
                        //console.log(res.data.data.id);
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
                    console.log(res);
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
    },
    modules: {

    }
});

export default store;