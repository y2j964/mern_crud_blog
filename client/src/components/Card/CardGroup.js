import React, { useState } from 'react';
import Card from './Card';

export default function CardGroup(props) {
  const [CardData, setCardData] = useState([
    {
      title: 'Welcome to MERN Crud Blog!',
      description: 'This is a bunch of apocryphal rhubarb',
      author: 'Dougie Jones',
      date: 'Thursday 3:30PM',
    },
    {
      title: 'Me and My Tulpas',
      description: 'A guide to living in the world of David Lynch',
      author: 'Special Agent Dale Cooper',
      date: 'Friday 3:30PM',
    },
  ]);
  const CardGroup = CardData.map(({ title, author, description, date }) => (
    <Card
      title={title}
      description={description}
      author={author}
      date={date}
    />
  ));
  return <div className="flex flex-col items-center">{CardGroup}</div>;
}
