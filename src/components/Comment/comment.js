import images from '~/assets/images';
import './Comment.scss';
import { useContext, useState } from 'react';
import { UserContext } from '~/context/UserContext';
import DeleteCommentModal from './Modals/deleteCommentModal';

const CommentSection = (props) => {
    const { user } = useContext(UserContext);
    const account = user.account;
    const { User, message, id, createdAt } = props.value;

    const [showDeleteCommentModal, setShowDeleteCommentModal] = useState(false);

    const handleDate = (outputDate) => {
        const dateString = outputDate;
        const date = new Date(dateString);

        const month = date.getMonth() + 1; // Months are zero-based, so add 1
        const day = date.getDate();
        const data = `${day}/${month} `;
        return data;
    };

    const handleCloseComment = () => {
        setShowDeleteCommentModal(false);
    };

    const handleDeleteCommentClicked = () => {
        setShowDeleteCommentModal(true);
    };

    return (
        <div className="comment-wrapper">
            <div className="inner">
                <div className="comment-img">
                    <img src={User && User.avatar ? User.avatar : images.defaultAvatar} alt="user-ava" />
                </div>
                <div className="comment-body">
                    <div className="name">
                        {User.username}
                        <span className="comment-date">.{handleDate(createdAt)}</span>
                    </div>
                    <div className="content">{message}</div>
                </div>
                {account.groupWithRole?.name === 'Admin' ? (
                    <>
                        <i className="fa fa-ban delete-icon" aria-hidden="true" onClick={handleDeleteCommentClicked}></i>
                    </>
                ) : (
                    <></>
                )}

                <DeleteCommentModal
                    showDeleteCommentModal={showDeleteCommentModal}
                    handleClose={handleCloseComment}
                    commentId={id}
                    fetchAllComments={props.fetchAllComments}
                />
            </div>
        </div>
    );
};

export default CommentSection;
