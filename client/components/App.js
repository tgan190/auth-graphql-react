import React from 'react';
import Header from './Header';

const App = (props) => {
    {/* console.log('props 2 in App: ',props); */}
    return (
        <div className="container">
            <Header />
          {props.children}
        </div>

    );
};

export default App;
