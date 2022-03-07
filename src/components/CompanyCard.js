import { Box, Heading, LinkBox, LinkOverlay } from "@chakra-ui/react";

function CompanyCard({ name, address, _id }) {

    return (
        <div>
            <LinkBox as='article' maxW='sm' p='5' borderWidth='1px' rounded='md' mt={4}>
                <Heading size='md' my='2'>
                    <LinkOverlay href={`companies/${_id}`}>
                        {name}
                    </LinkOverlay>
                </Heading>
            </LinkBox>
        </div>
    );
}

export default CompanyCard;
