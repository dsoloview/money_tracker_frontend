import BottomNavigation from "@/features/bottomBar/BottomNavigation.tsx";

const BottomBar = () => {
    return (
        <div className="flex items-center justify-center sm:visible lg:hidden fixed bottom-0 h-[60px] w-[100%]">
            <div className="absolute w-[100%] h-[100%] bg-gray-100 opacity-90"></div>
            <BottomNavigation/>
        </div>
    );
}

export default BottomBar;