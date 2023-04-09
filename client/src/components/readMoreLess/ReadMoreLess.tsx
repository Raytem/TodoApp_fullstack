import classNames from 'classnames';
import React, { FC, useState } from 'react'
import styles from './readMoreLess.module.css'

interface ReadMoreLessProps {
    limit: number,
    children: React.ReactElement<HTMLDivElement> | React.ReactElement<HTMLParagraphElement> | React.ReactElement<HTMLHeadElement>;
    show?: boolean;
}

export const ReadMoreLess: FC<ReadMoreLessProps> = ({limit, children, show}) => {
    const [showMore, setShowMore] = useState<boolean>(show as boolean);
    const [str, setStr] = useState<string>(`${children.props.children}`);

    return (
    <>
        {
            str.length > limit 
            ?
                <div>
                    {
                    showMore
                    ?
                        children
                    :
                        <div className={children.props.className}>{str.substring(0, limit - 3) + '...'}</div>
                    }
                    
                    <button 
                        className={
                            showMore ? classNames(styles.readMoreLess, styles.readMoreLess_less) : styles.readMoreLess
                        } 
                        onClick={() => setShowMore(!showMore)}>
                        {showMore ? 'Show less' : 'Show more'}
                    </button>
                </div> 
            :
                <div>{children}</div>          
        }
    </>
  )
}
