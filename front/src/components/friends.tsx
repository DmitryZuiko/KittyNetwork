import React, {useState} from "react";
import './friends.css';
import {useDispatch, useSelector} from "react-redux";
import {addFriend, getAllFriends} from "../services/friends-fetch-service";

export const Friends: React.FC = () => {

    const dispatch = useDispatch();

    const friendState = useSelector((state: any) => state.friendReducer.friendState);
    const dataBaseUsers = useSelector((state: any) => state.userReducer.dataBaseUsers);
    const activeUserId = useSelector((state: any) => state.userReducer.id);

    const [localUsers, setLocalUsers] = useState([]);

    const filterUsers = (text: string) => {
        if (text) {
            setLocalUsers(dataBaseUsers.filter((user: any) => user.login.includes(text)))
        } else {
            setLocalUsers([])
        }
    }

    const addNewFriend = async(id: string) => {
        await addFriend({
            userId: activeUserId,
            friendId: id
        })
        dispatch( {
            type: "GET_ALL_FRIENDS",
            payload: await getAllFriends(activeUserId)
        })
    }

    return (
        <div className="news">
            <div className="friends-container">
                <div className="friends-cont">
                    <div className="friends-search-info">
                    <input
                        className="search__input"
                        placeholder="Enter login..."
                        onChange={(e) => filterUsers(e.target.value)}
                    >
                    </input>
                    </div>
                    <div className="new-friends">
                        {
                            localUsers.map((user: any) => {
                                return (
                                    <div className="new-friend" key={user.userId}>
                                        <img className="new-friend-avatar" src={user.avatar} alt=""/>
                                        <p className="new-friend-login">{user.login}</p>
                                        <a
                                            onClick={addNewFriend.bind(null, user.userId)}
                                            href="/#"
                                            className="add-friend"
                                        >Add</a>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <fieldset>
                        <legend>Friends:</legend>
                        <div className="my-friends">
                            {
                                friendState.map((friend: {id: string, avatar: string, login: string}) => {
                                    return (
                                        <div className="friend" key={friend.id}>
                                            <img className="friend-avatar" src={friend.avatar} alt=""/>
                                            <p className="friend-login">{friend.login}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>
    )
}