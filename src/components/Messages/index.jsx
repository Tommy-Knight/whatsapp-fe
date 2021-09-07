import './style.css'


const MessageRow = ({position}) => {
    position = position === 'start' || position === 'end' ? position : ''

    return (
        <div className={`d-flex justify-content-${position}`} style={{width: '100%', height: 'max-content'}}>
            <p style={{maxWidth: '25%', height: 'max-content'}}>
                {'< message text >'}
            </p>
        </div>)
}

const Messages = ({
                      messages = [
                          {sender: 'delta'}, {},
                          {sender: 'delta'}, {}, {},
                          {sender: 'delta'}, {},
                      ],
                      loggedUser = 'delta'
                  }) => {



    return (
        <div style={{width: '100%', height: '100%'}}>
            {
                messages.map(msg =>
                    <MessageRow position={msg.sender === loggedUser ? 'end' : 'start'}/>
                ).reverse()
            }
        </div>
    )
}

export default Messages