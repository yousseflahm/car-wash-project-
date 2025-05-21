import { Fragment , useState  } from "react";
import { Link, usePage, useForm, Head } from "@inertiajs/react";
import { Dialog, Menu, Transition } from "@headlessui/react";
// icons from the heroicons/react
import {
    Bars3Icon,
    BellIcon,
    Cog6ToothIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
// icons from the react-icons
import { BiCalendarCheck } from "react-icons/bi";
import { FaCarSide } from "react-icons/fa";
import { GiHomeGarage } from "react-icons/gi";
import { MdRateReview } from "react-icons/md";
import { IoDocuments } from "react-icons/io5";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import ApplicationLogo from "@/Components/ApplicationLogo";

export default function ClientAthentificatedLayout({ children }) {
    // Get the user from the page props
    const user = usePage().props.auth.user;
    // Get the route function
    const { post } = useForm();
    // Get the notifications from the page props
    const initialNotifications = usePage().props.notifications || [];
    const [notifications, setNotifications] = useState(initialNotifications);
    
    // translations
    const{translations} = usePage().props;
    const t  = translations.messages;
   

    //  State for the sidebar
    const [sidebarOpen, setSidebarOpen] = useState(false);
    // Get the current path
    const currentPath = usePage().url;
    // Navigation links
    const navigationItems = [
        { name: t.dashboard , href: route("dashboard"), icon: GiHomeGarage },
        {
            name: t.reservation,
            href: route("BookingPage"),
            icon: BiCalendarCheck,
        },
        { name: t.mangeCars, href: route("MangeCar"), icon: FaCarSide },
        {
            name: t.leaveReview,
            href: route("ReviewPage"),
            icon: MdRateReview,
        },
        {
            name: t.reservationInvoice,
            href: route("BookingInvoicePage"),
            icon: IoDocuments,
        },
    ];

    // Map over navigationItems to add `current` dynamically
    const navigation = navigationItems.map((item) => ({
        ...item,
        current:
            currentPath === new URL(item.href, window.location.origin).pathname,
    }));
    //   User navigation links
    const userNavigation = [
        {
            name: t.yourProfile,
            href: route("profile.edit"),
            methodType: "get",
        },
        { name: t.logout, href: route("logout"), methodType: "post" },
    ];
    //   Function to add classes to the elements
    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }
    const SettingsRoute = route("profile.edit");

    // Function to mark a notification as read
    const markAsRead = (notificationId) => {
        post(route("notifications.markAsRead", notificationId), {
            onSuccess: () => {
                // Remove the notification from the local state
                setNotifications((prev) =>
                    prev.filter(
                        (notification) => notification.id !== notificationId
                    )
                );
            },
        });
    };

    // Function to mark all notifications as read
    const markAllAsRead = () => {
        post(route("notifications.markAllAsRead"), {
            onSuccess: () => {
                // Clear all notifications from the local state
                setNotifications([]);
            },
        });
    };

    return (
        <>
            <Head title="Dashboard" />
            <div className="font-kanit">
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-50 lg:hidden"
                        onClose={setSidebarOpen}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-900/80" />
                        </Transition.Child>

                        <div className="fixed inset-0 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                            <button
                                                type="button"
                                                className="-m-2.5 p-2.5"
                                                onClick={() =>
                                                    setSidebarOpen(false)
                                                }
                                            >
                                                <span className="sr-only">
                                                    Close sidebar
                                                </span>
                                                <XMarkIcon
                                                    className="h-6 w-6 text-white"
                                                    aria-hidden="true"
                                                />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    {/* Sidebar component, For Phone (Small Devices) */}
                                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-blue-100 px-6 pb-4 ring-1 ring-white/10">
                                        <div className="flex pl-4  my-4 h-16  ">
                                            <ApplicationLogo />
                                        </div>
                                        <nav className="flex flex-1 flex-col">
                                            <ul
                                                role="list"
                                                className="flex flex-1 flex-col gap-y-7"
                                            >
                                                <li>
                                                    <ul
                                                        role="list"
                                                        className="-mx-2 space-y-1"
                                                    >
                                                        {navigation.map(
                                                            (item) => (
                                                                <li
                                                                    key={
                                                                        item.name
                                                                    }
                                                                >
                                                                    <a
                                                                        href={
                                                                            item.href
                                                                        }
                                                                        className={classNames(
                                                                            item.current
                                                                                ? "bg-blue-400 text-white"
                                                                                : "text-blue transition delay-80 hover:text-white hover:bg-blue-400",
                                                                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 pl-6 my-4"
                                                                        )}
                                                                    >
                                                                        <item.icon
                                                                            className="h-6 w-6 shrink-0"
                                                                            aria-hidden="true"
                                                                        />
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </a>
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </li>
                                                {/* setting small devices  */}
                                                <li className="mt-auto">
                                                    <a
                                                        href={SettingsRoute}
                                                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                                                    >
                                                        <Cog6ToothIcon
                                                            className="h-6 w-6 shrink-0"
                                                            aria-hidden="true"
                                                        />
                                                        {t.settings}
                                                    </a>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                    {/* Sidebar component, For the Disktop (Large Devices)*/}
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-blue-200 bg-opacity-75 px-6 pb-4">
                        <div className="flex h-16 pl-4  my-4 shrink-0 items-center">
                            <ApplicationLogo />
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul
                                role="list"
                                className="flex flex-1 flex-col gap-y-7"
                            >
                                <li>
                                    <ul
                                        role="list"
                                        className="-mx-2 space-y-1 "
                                    >
                                        {navigation.map((item) => (
                                            <li key={item.name}>
                                                <a
                                                    href={item.href}
                                                    className={classNames(
                                                        item.current
                                                            ? "bg-blue-400 text-white"
                                                            : "text-blue transition delay-80 hover:text-white hover:bg-blue-400",
                                                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 pl-6 my-4 "
                                                    )}
                                                >
                                                    <item.icon
                                                        className="h-6  w-6 shrink-0"
                                                        aria-hidden="true"
                                                    />
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                                {/* setting for large devices */}
                                <li className="mt-auto">
                                    <a
                                        href={SettingsRoute}
                                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                                    >
                                        <Cog6ToothIcon
                                            className="h-6 w-6 shrink-0"
                                            aria-hidden="true"
                                        />
                                       {t.settings}
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="lg:pl-72">
                    <div className="sticky top-0  z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                        <button
                            type="button"
                            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>

                        <div className="flex flex-1 justify-end gap-x-4 self-stretch lg:gap-x-6">
                            <div className="flex items-center gap-x-4 lg:gap-x-6">
                                {/* Language Dropdown */}
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <Menu.Button className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none">
                                            <span className="sr-only">
                                                Open language menu
                                            </span>
                                            EN/FR
                                            <ChevronDownIcon
                                                className="ml-2 h-5 w-5 text-gray-400"
                                                aria-hidden="true"
                                            />
                                        </Menu.Button>
                                    </div>

                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href={route(
                                                            "lang.switch",
                                                            ["en"]
                                                        )}
                                                        className={`block px-4 py-2 text-sm ${
                                                            active
                                                                ? "bg-gray-100 text-gray-900"
                                                                : "text-gray-700"
                                                        }`}
                                                    >
                                                        English
                                                    </a>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href={route(
                                                            "lang.switch",
                                                            ["fr"]
                                                        )}
                                                        className={`block px-4 py-2 text-sm ${
                                                            active
                                                                ? "bg-gray-100 text-gray-900"
                                                                : "text-gray-700"
                                                        }`}
                                                    >
                                                        Français
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>

                                {/* Separator */}
                                <div
                                    className="hidden  lg:block lg:h-6  lg:w-px lg:bg-gray-900/10"
                                    aria-hidden="true"
                                />
                                {/* notification */}
                                <Menu as="div" className="relative">
                                    <Menu.Button className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                                        <span className="sr-only">
                                            View notifications
                                        </span>
                                        <BellIcon
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        />
                                        {notifications.length > 0 && (
                                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                                                {notifications.length}
                                            </span>
                                        )}
                                    </Menu.Button>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="p-4">
                                                <div className="flex justify-between items-center">
                                                    <h3 className="text-lg font-medium">
                                                        Notifications
                                                    </h3>
                                                    <button
                                                        onClick={markAllAsRead}
                                                        className="text-sm text-blue-500 hover:text-blue-700"
                                                    >
                                                        Mark all as read
                                                    </button>
                                                </div>
                                                <div className="mt-2">
                                                    {notifications.length ===
                                                    0 ? (
                                                        <p className="text-sm text-gray-500">
                                                            No new
                                                            notifications.
                                                        </p>
                                                    ) : (
                                                        notifications.map(
                                                            (notification) => (
                                                                <div
                                                                    key={
                                                                        notification.id
                                                                    }
                                                                    className="p-2 hover:bg-gray-50 cursor-pointer"
                                                                    onClick={() =>
                                                                        markAsRead(
                                                                            notification.id
                                                                        )
                                                                    }
                                                                >
                                                                    <p className="text-sm text-gray-700">
                                                                        {
                                                                            notification.message
                                                                        }
                                                                    </p>
                                                                    <p className="text-xs text-gray-500">
                                                                        {new Date(
                                                                            notification.created_at
                                                                        ).toLocaleString(
                                                                            "en-US",
                                                                            {
                                                                                year: "numeric",
                                                                                month: "2-digit",
                                                                                day: "2-digit",
                                                                                hour: "2-digit",
                                                                                minute: "2-digit",
                                                                                hour12: false,
                                                                            }
                                                                        )}
                                                                    </p>
                                                                </div>
                                                            )
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                                {/* Separator */}
                                <div
                                    className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                                    aria-hidden="true"
                                />

                                {/* Profile dropdown */}
                                <Menu as="div" className="relative">
                                    <Menu.Button className="-m-1.5 flex items-center p-1.5">
                                        <span className="sr-only">
                                            Open user menu
                                        </span>
                                        <img
                                            className="h-12 w-12 rounded-full bg-gray-50"
                                            src="/profile1.jpg"
                                            alt=""
                                        />
                                        <span className="hidden lg:flex lg:items-center">
                                            <span
                                                className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                                                aria-hidden="true"
                                            >
                                                {user.name} {user.lastName}
                                            </span>
                                            <ChevronDownIcon
                                                className="ml-2 h-5 w-5 text-gray-400"
                                                aria-hidden="true"
                                            />
                                        </span>
                                    </Menu.Button>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                            {userNavigation.map((item) => (
                                                <Menu.Item key={item.name}>
                                                    {({ active }) => (
                                                        <Link
                                                            href={item.href}
                                                            method={
                                                                item.methodType
                                                            }
                                                            className={classNames(
                                                                active
                                                                    ? "bg-gray-50"
                                                                    : "",
                                                                "block px-3 py-1 text-sm leading-6 text-gray-900"
                                                            )}
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <main className="py-10">
                        <div className="px-4 sm:px-6 lg:px-8">{children}</div>
                    </main>
                </div>
            </div>
        </>
    );
}
