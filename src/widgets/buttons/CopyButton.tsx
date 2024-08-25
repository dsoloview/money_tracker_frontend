import * as React from "react";
import {useState} from "react";
import {Button} from "@/ui/button";
import {Check, Copy} from "lucide-react";
import {useTranslation} from "react-i18next";

interface CopyButtonProps {
    textToCopy: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({textToCopy}) => {
    const [copied, setCopied] = useState(false);
    const {t} = useTranslation();

    const handleCopy = () => {
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    };

    return (
        <Button
            onClick={handleCopy}
            variant={copied ? "green" : "default"}
            size="sm"
            className="flex items-center space-x-2"
        >
            {copied ? (
                <>
                    <Check className="h-4 w-4"/>
                    <span>{t('service.copy.copied')}</span>
                </>
            ) : (
                <>
                    <Copy className="h-4 w-4"/>
                    <span>{t('service.copy.copy')}</span>
                </>
            )}
        </Button>
    );
};

export default CopyButton;
