import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

const formatter = new Intl.DateTimeFormat('en-us', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  timeZoneName: 'short',
});

function PostPreview() {
  const defaultTitle = 'This is where your title will go';
  const defaultBody = JSON.stringify({
    ops: [
      {
        attributes: { alt: '' },
        insert: {
          imageAlt:
            'https://images.unsplash.com/photo-1459262838948-3e2de6c1ec80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
        },
      },
      {
        insert:
          "\nThis is where your post body goes. Well, the first line of this preview post's body is technically the image of the koala above. If you don't insert an image on the first line, the text would begin in the place of the koala. This is the case even if you include a thumbnail image. We consequently recommend you start off with an image. Here's some more text from our post body:\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed adipiscing diam donec adipiscing tristique. Sodales neque sodales ut etiam sit amet nisl. Cursus vitae congue mauris rhoncus aenean vel elit. Elit at imperdiet dui accumsan sit amet. Rhoncus urna neque viverra justo nec ultrices. Eu turpis egestas pretium aenean pharetra. Praesent tristique magna sit amet purus. Id eu nisl nunc mi. Et malesuada fames ac turpis. Diam quis enim lobortis scelerisque fermentum dui faucibus in.\nEgestas pretium aenean pharetra magna ac placerat vestibulum lectus mauris. Tempor orci dapibus ultrices in iaculis nunc sed augue. At tellus at urna condimentum mattis pellentesque id nibh. Urna duis convallis convallis tellus id interdum velit laoreet. Varius quam quisque id diam vel. Ac placerat vestibulum lectus mauris. Id donec ultrices tincidunt arcu non sodales neque sodales. Urna condimentum mattis pellentesque id nibh tortor id aliquet. Nullam ac tortor vitae purus faucibus ornare. \nArcu dictum varius duis at. Bibendum ut tristique et egestas. Cras pulvinar mattis nunc sed. Enim neque volutpat ac tincidunt vitae semper quis lectus. Id diam maecenas ultricies mi eget mauris pharetra. Porttitor rhoncus dolor purus non enim praesent. Tristique magna sit amet purus gravida. Tellus mauris a diam maecenas sed enim ut sem viverra. Amet nisl purus in mollis nunc sed id semper. Consequat mauris nunc congue nisi vitae suscipit tellus mauris a. Non arcu risus quis varius quam. Nulla pharetra diam sit amet nisl suscipit. Dignissim sodales ut eu sem. Eget duis at tellus at. Cursus euismod quis viverra nibh cras pulvinar mattis. Accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu. Condimentum lacinia quis vel eros donec ac odio tempor.\nUrna porttitor rhoncus dolor purus. Massa ultricies mi quis hendrerit dolor magna. Cursus turpis massa tincidunt dui ut ornare. Potenti nullam ac tortor vitae purus faucibus ornare suspendisse. Mauris commodo quis imperdiet massa tincidunt. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Morbi tristique senectus et netus et malesuada fames ac.\nLacus sed viverra tellus in. Facilisis sed odio morbi quis commodo odio aenean sed. In vitae turpis massa sed elementum tempus egestas sed sed. Erat nam at lectus urna duis. Dictum varius duis at consectetur lorem donec massa. \nA iaculis at erat pellentesque adipiscing commodo elit at. Imperdiet nulla malesuada pellentesque elit eget gravida cum. Eu lobortis elementum nibh tellus. Vulputate ut pharetra sit amet. Ullamcorper velit sed ullamcorper morbi tincidunt ornare. Tempus egestas sed sed risus pretium quam vulputate. Curabitur vitae nunc sed velit. Diam volutpat commodo sed egestas egestas fringilla phasellus. Consequat ac felis donec et odio pellentesque diam. Nunc aliquet bibendum enim facilisis gravida.\nMalesuada bibendum arcu vitae elementum curabitur vitae nunc. Dui faucibus in ornare quam viverra orci sagittis eu. Maecenas accumsan lacus vel facilisis volutpat est velit egestas. Commodo viverra maecenas accumsan lacus vel facilisis volutpat est. Cras semper auctor neque vitae. Ultrices vitae auctor eu augue ut lectus arcu bibendum. Morbi blandit cursus risus at ultrices. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien. Metus vulputate eu scelerisque felis. Ut tristique et egestas quis ipsum.\nDignissim enim sit amet venenatis urna. Neque vitae tempus quam pellentesque nec. Volutpat sed cras ornare arcu. Ullamcorper morbi tincidunt ornare massa. Aliquet sagittis id consectetur purus ut faucibus pulvinar. Facilisis gravida neque convallis a cras semper auctor neque vitae. Est ante in nibh mauris cursus mattis molestie a iaculis. Gravida neque convallis a cras semper auctor. Eget dolor morbi non arcu. Ut tristique et egestas quis ipsum suspendisse ultrices. Sit amet commodo nulla facilisi nullam. Vel pharetra vel turpis nunc eget lorem. Massa enim nec dui nunc mattis enim. Tempor nec feugiat nisl pretium fusce id velit. Nulla aliquet enim tortor at auctor urna nunc id cursus. Est placerat in egestas erat imperdiet sed euismod nisi porta. Tellus cras adipiscing enim eu turpis. Morbi non arcu risus quis varius quam quisque. Morbi tincidunt augue interdum velit euismod in pellentesque. Viverra suspendisse potenti nullam ac tortor vitae.\nDiam vel quam elementum pulvinar etiam. Sem nulla pharetra diam sit amet nisl. Adipiscing enim eu turpis egestas pretium aenean pharetra magna ac. Ipsum nunc aliquet bibendum enim facilisis gravida. Mi in nulla posuere sollicitudin. Urna duis convallis convallis tellus id interdum velit laoreet. Quam id leo in vitae turpis massa sed. Et netus et malesuada fames ac. Cursus eget nunc scelerisque viverra mauris in aliquam sem. Sem et tortor consequat id. Augue interdum velit euismod in pellentesque massa placerat duis ultricies.\n",
      },
    ],
  });
  const defaultDescription = 'This is where your description will go';
  const dateFull = new Date();

  return (
    <main className="max-w-3xl mx-auto">
      <header className="text-center pb-4">
        <h1 className="font-bold text-4xl pt-8 pb-3 capitalize" tabIndex="-1">
          {defaultTitle}
        </h1>
        <p className="mb-2 text-lg">{defaultDescription}</p>
        <span className="text-sm text-accent">Your account name goes here</span>
        <span className="text-sm"> | </span>
        <time className="text-sm">{formatter.format(dateFull)}</time>
      </header>
      <ReactQuill
        value={JSON.parse(defaultBody).ops}
        theme="bubble"
        readOnly={true}
      />
    </main>
  );
}

export default PostPreview;
