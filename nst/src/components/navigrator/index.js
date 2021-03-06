import React from "react";
import './index.css'
import { NavLink } from "react-router-dom";

const forms = [
    {
        link: 'JS002',
        name: 'NST－04－JS002－2011－软件项目委托测试申请表-空白表'
    },
    {
        link: 'JS011',
        name: 'NST－04－JS011－2011－软件测试问题清单（电子记录）'
    },
    {
        link: 'test1',
        name: 'test1'
    },
    {
        link: 'test2',
        name: 'test2'
    },
    {
        link: 'test3',
        name: 'test3'
    },
    {
        link: 'test4',
        name: 'test4'
    },
];

export default function Navigator() {
    return (
        <ul
            className="navigator"
        >
            <li>
                <NavLink
                    className="main-navigator-link"
                    style={({ isActive }) => {
                        return {
                            background: isActive ? '#8282e3' : '#494998'
                        }
                    }}
                    to="/"
                    key="/"
                >
                    首页
                </NavLink>
            </li>
            <li className="has-sub-nav main-navigator-link">
                表单
                <ul className="sub-navigator">
                    {forms.map(form => {
                        return (
                            <li key={form.name}>
                                <NavLink
                                    className="navigator-link"
                                    style={({ isActive }) => {
                                        return {
                                            background: isActive ? '#8282e3' : '#494998'
                                        }
                                    }}
                                    to={`/forms/${form.link}`}
                                    key={form.link}
                                >
                                    {form.name}
                                </NavLink>
                            </li>
                        )
                    })}
                </ul>

            </li>
        </ul>
    )
}