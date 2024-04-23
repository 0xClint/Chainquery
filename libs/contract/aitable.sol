// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.10 <0.9.0;

import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {TablelandDeployments} from "@tableland/evm/contracts/utils/TablelandDeployments.sol";
import {SQLHelpers} from "@tableland/evm/contracts/utils/SQLHelpers.sol";
import {ERC721Holder} from "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

contract AI is ERC721Holder {
    uint256 private aiTableId;
    string private constant _AI_TABLE_PREFIX = "ai_table";

    constructor() {
        // Create AITable
        aiTableId = TablelandDeployments.get().create(
            address(this),
            SQLHelpers.toCreateFromSchema(
                "id integer primary key unique not null,"
                "address text primary key not null,"
                "cid text not null",
                _AI_TABLE_PREFIX
            )
        );
    }

    function getAITableName() external view returns (string memory) {
        return SQLHelpers.toNameFromId(_AI_TABLE_PREFIX, aiTableId);
    }

    function createAI(
        uint256 id,
        string memory addr,
        string memory cid
    ) external {
        string memory insertQuery = SQLHelpers.toInsert(
            _AI_TABLE_PREFIX,
            aiTableId,
            "id, address, cid",
            string.concat(
                Strings.toString(id),
                ",",
                SQLHelpers.quote(addr),
                ",",
                SQLHelpers.quote(cid)
            )
        );

        TablelandDeployments.get().mutate(
            address(this),
            aiTableId,
            insertQuery
        );
    }

    function updateAI(
        uint256 id,
        string memory addr,
        string memory cid
    ) external {
        string memory setters = string.concat(
            "cid=",
            SQLHelpers.quote(cid)
        );

        string memory filters = string.concat("id=", Strings.toString(id), " AND address=", SQLHelpers.quote(addr));

        TablelandDeployments.get().mutate(
            address(this),
            aiTableId,
            SQLHelpers.toUpdate(
                _AI_TABLE_PREFIX,
                aiTableId,
                setters,
                filters
            )
        );
    }

    function deleteAI(uint256 id, string memory addr) external {
        string memory filters = string.concat("id=", Strings.toString(id), " AND address=", SQLHelpers.quote(addr));

        TablelandDeployments.get().mutate(
            address(this),
            aiTableId,
            SQLHelpers.toDelete(_AI_TABLE_PREFIX, aiTableId, filters)
        );
    }
}