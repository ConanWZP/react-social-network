import React from 'react';
import classes from './Post.module.css';

const Post = (props) => {
	return (
		<div className={classes.item}>
			<img src="https://proprikol.ru/wp-content/uploads/2020/10/kartinki-nochnogo-goroda-2.jpeg" alt="" />
			{props.message}
			<div>
				<span>{props.like} лайков</span>
			</div>
		</div>
	);
}

export default Post;