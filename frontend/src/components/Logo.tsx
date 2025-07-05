import CookieIcon from "@mui/icons-material/Cookie";

const styles = {
    largeIcon: {
        width: 40,
        height: 40,
        color: "#786414",
    },
};

export const Logo = () => {
    return (
        <div className="text-xl font-medium flex items-center gap-1">
            <CookieIcon style={styles.largeIcon} />
            Biscuit DB
        </div>
    );
};
