import { useRouter } from "next/router";

const Language: React.FC = () => {
    const router = useRouter();
    const { locale, pathname, asPath, query } = router;

    const handleLanguageChange = (event: { target: { value: string } }) => {
        const newLocale = event.target.value;
        const { pathname, asPath, query } = router;
        router.push({ pathname, query }, asPath, { locale: newLocale });
    };

    return (
        <div className="ml-6">
            <label htmlFor="language" className="text-white">
                {/* Language */}
            </label>
            <select
                id="language"
                className="ml-2 p-1 text-black rounded"
                value={locale}
                onChange={handleLanguageChange}
            >
                <option value="en" className="text-black">
                    EN
                </option>
                <option value="be" className="text-black">
                    BE
                </option>
            </select>
        </div>
    );
};

export default Language;
