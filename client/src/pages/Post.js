import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Post({ title, description, author, time, body }) {
  const ref = useRef();
  useEffect(() => {
    document.title = 'Blog Post - MERN Crud Blog';
    // focus h1 on route change to let screen reader know we changed route
    ref.current.focus();
  }, []);
  return (
    <main className="max-w-3xl mx-auto">
      <header className="text-center pb-4">
        <h1
          className="font-bold text-4xl pt-8 pb-6 capitalize"
          tabIndex="-1"
          ref={ref}
        >
          Really Cool Blog Post Title
        </h1>
        <p className="mb-2">Some apocryphal rhubarb of a description</p>
        <Link to="/authors/23904ujfmqej" className="text-sm text-accent">
          Justin Mooney
        </Link>
        <span className="text-sm"> | </span>
        <span className="text-sm">January 1, 2020</span>
        {/* img placeholder */}
        <div className="w-full h-64 mt-3 bg-gray-200"></div>
      </header>
      <article>
        <p className="mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Metus
          dictum at tempor commodo ullamcorper a. Mattis ullamcorper velit sed
          ullamcorper morbi tincidunt ornare massa eget. Magna sit amet purus
          gravida. Quam lacus suspendisse faucibus interdum posuere lorem.
          Integer vitae justo eget magna fermentum iaculis eu non. Vel pharetra
          vel turpis nunc. Ipsum faucibus vitae aliquet nec ullamcorper sit
          amet. Vitae congue mauris rhoncus aenean vel elit scelerisque mauris.
          In pellentesque massa placerat duis. Turpis massa tincidunt dui ut
          ornare. Sit amet commodo nulla facilisi nullam vehicula ipsum a.
          Elementum sagittis vitae et leo duis ut. Nisi vitae suscipit tellus
          mauris. Nulla facilisi etiam dignissim diam quis enim lobortis.
        </p>

        <p className="mb-4">
          A iaculis at erat pellentesque adipiscing commodo elit at. Imperdiet
          nulla malesuada pellentesque elit eget gravida cum. Eu lobortis
          elementum nibh tellus. Vulputate ut pharetra sit amet. Ullamcorper
          velit sed ullamcorper morbi tincidunt ornare. Tempus egestas sed sed
          risus pretium quam vulputate. Curabitur vitae nunc sed velit. Diam
          volutpat commodo sed egestas egestas fringilla phasellus. Consequat ac
          felis donec et odio pellentesque diam. Nunc aliquet bibendum enim
          facilisis gravida.
        </p>

        <p className="mb-4">
          Malesuada bibendum arcu vitae elementum curabitur vitae nunc. Dui
          faucibus in ornare quam viverra orci sagittis eu. Maecenas accumsan
          lacus vel facilisis volutpat est velit egestas. Commodo viverra
          maecenas accumsan lacus vel facilisis volutpat est. Cras semper auctor
          neque vitae. Ultrices vitae auctor eu augue ut lectus arcu bibendum.
          Morbi blandit cursus risus at ultrices. Mauris commodo quis imperdiet
          massa tincidunt nunc pulvinar sapien. Metus vulputate eu scelerisque
          felis. Ut tristique et egestas quis ipsum.
        </p>

        <p className="mb-4">
          Dignissim enim sit amet venenatis urna. Neque vitae tempus quam
          pellentesque nec. Volutpat sed cras ornare arcu. Ullamcorper morbi
          tincidunt ornare massa. Aliquet sagittis id consectetur purus ut
          faucibus pulvinar. Facilisis gravida neque convallis a cras semper
          auctor neque vitae. Est ante in nibh mauris cursus mattis molestie a
          iaculis. Gravida neque convallis a cras semper auctor. Eget dolor
          morbi non arcu. Ut tristique et egestas quis ipsum suspendisse
          ultrices. Sit amet commodo nulla facilisi nullam. Vel pharetra vel
          turpis nunc eget lorem. Massa enim nec dui nunc mattis enim. Tempor
          nec feugiat nisl pretium fusce id velit. Nulla aliquet enim tortor at
          auctor urna nunc id cursus. Est placerat in egestas erat imperdiet sed
          euismod nisi porta. Tellus cras adipiscing enim eu turpis. Morbi non
          arcu risus quis varius quam quisque. Morbi tincidunt augue interdum
          velit euismod in pellentesque. Viverra suspendisse potenti nullam ac
          tortor vitae.
        </p>

        <p>
          Diam vel quam elementum pulvinar etiam. Sem nulla pharetra diam sit
          amet nisl. Adipiscing enim eu turpis egestas pretium aenean pharetra
          magna ac. Ipsum nunc aliquet bibendum enim facilisis gravida. Mi in
          nulla posuere sollicitudin. Urna duis convallis convallis tellus id
          interdum velit laoreet. Quam id leo in vitae turpis massa sed. Et
          netus et malesuada fames ac. Cursus eget nunc scelerisque viverra
          mauris in aliquam sem. Sem et tortor consequat id. Augue interdum
          velit euismod in pellentesque massa placerat duis ultricies.
        </p>
      </article>
    </main>
  );
}

Post.propTypes = {};

export default Post;
