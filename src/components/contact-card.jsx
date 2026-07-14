// src/components/contact-card.jsx

import { Star, Phone } from "lucide-react";

export const ContactCard = ({ name, phone, job, favorite, avatar }) => {
    return (
        <div className="group relative flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-5">

            {favorite && (
                <span className="absolute right-3 top-3 text-amber-400" title="Favorite">
                    <Star className="h-5 w-5 fill-amber-400 drop-shadow-sm" />
                </span>
            )}

            <div className="shrink-0">
                {avatar ? (
                    <img
                        src={avatar}
                        alt={name}
                        className="h-14 w-14 rounded-full object-cover ring-2 ring-stone-100 sm:h-16 sm:w-16"
                    />
                ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-600 text-lg font-semibold text-white ring-2 ring-stone-100 sm:h-16 sm:w-16">
                        {name?.charAt(0).toUpperCase()}
                    </div>
                )}
            </div>

            <div className="min-w-0 flex-1">
                <h3 className="truncate font-['Noto_Serif'] text-base font-semibold text-stone-800 sm:text-lg">
                    {name}
                </h3>
                <p className="truncate text-sm text-stone-500">{job}</p>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-stone-600" dir="ltr">
                    <Phone className="h-3.5 w-3.5 shrink-0 text-teal-600" />
                    {phone}
                </p>
            </div>
        </div>
    );
};