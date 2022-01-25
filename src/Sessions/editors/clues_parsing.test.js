import { parse_clues_to_used_and_unused } from "./CluesEditor"; 

import { clues_data_sample as testClues } from "../test_data_samples";


test('getting empty lists when no clues', () => {
    const {used_clues, unused_clues} = parse_clues_to_used_and_unused([])
    expect(used_clues).toEqual([])
    expect(unused_clues).toEqual([])
})

test('getting all the used', () => {
    const {used_clues} = parse_clues_to_used_and_unused(testClues)
    expect(used_clues).toEqual([
        {
            category: "onlyUsed",
            items: ["used1","used2",]
        },{
            category: "mixed",
            items: ["used3"],
        },
    ])
})

test('getting all the unused', () => {
    const {unused_clues} = parse_clues_to_used_and_unused(testClues)
    expect(unused_clues).toEqual([
        {
            category: "onlyUnused",
            items: ["unused1","unused2",]
        },{
            category: "mixed",
            items: ["unused3"],
        },
    ])
})