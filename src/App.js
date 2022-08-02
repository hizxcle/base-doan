import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PublicRoutes } from '~/routes';
import DefaultLayout from './components/LayOut/DefaultLayout';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    {PublicRoutes.map((route, index) => {
                        const Layout =
                            route.layout === null ? Fragment : DefaultLayout;
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
