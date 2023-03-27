import {Link} from 'react-router-dom';

export default function Header({
    heading,
    paragraph,
    linkName,
    linkUrl="#"

}){

    return (
        <div className="mb-10">
            <div className="flex justify-center">
                <i className="ss ss-ss3 text-4xl text-amber-600" />
            </div>
            <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                {heading}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-200 mt-5">
                {paragraph} {' '}
                <Link 
                    to={linkUrl}
                    className="font-medium text-amber-600 hover:text-amber-400"
                >
                    {linkName}
                </Link>
            </p>
        </div>
    );
}
 